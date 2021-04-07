const puppeteer = require('puppeteer')

viewController = {
  viewUsersCharacters: function (req, res) {
    const db = req.app.get('db')
    db.get.allUsersCharacters(req.user.id).then(data=> {
      res.send(data)
    })
  },
  viewCharacter: function (req, res) {
    viewController.assembleCharacter(req).then(character => {
      res.send(character)
    })
  },
  assembleCharacter: async function (req) {
    const db = req.app.get('db')
    return db.get.character(req.params.id).then(data=> {
      let character = data[0]
        , promiseArray = []
      promiseArray.push(db.get.stats.str(character.str).then(strData => {
        character.strData = strData[0]
        return true
      }))
      promiseArray.push(db.get.stats.dex(character.dex).then(dexData => {
        character.dexData = dexData[0]
        return true
      }))
      promiseArray.push(db.get.stats.cons(character.con).then(conData => {
        character.conData = conData[0]
        return true
      }))
      promiseArray.push(db.get.stats.int(character.int).then(intData => {
        character.intData = intData[0]
        return true
      }))
      promiseArray.push(db.get.stats.wis(character.wis).then(wisData => {
        character.wisData = wisData[0]
        return true
      }))
      promiseArray.push(db.get.stats.cha(character.cha).then(chaData => {
        character.chaData = chaData[0]
        return true
      }))
      promiseArray.push(db.get.goals(character.id).then(goals => {
        character.goals = goals
        return true
      }))
      return Promise.all(promiseArray).then(_=> {
        return character
      })
    })
  },
  downloadCharacters: function (req, res) {
    const db = req.app.get('db')
    puppeteer.launch().then(browser => {
      browser.newPage().then(page => {
        page.goto(`http://localhost:3000/download/${req.params.id}`, {
          waitUntil: "networkidle2"
        }).then(_=> {
          page.waitForSelector('div#loaded').then(_=>{
            page.pdf({
              format: "Letter",
              printBackground: true
            }).then(pdf=> {
              db.get.characterName(req.params.id.split('.')[0]).then(data => {
                res.set("Content-Disposition", `inline;filename=${data[0].name}.pdf`)
                res.send(pdf)
                browser.close();
              })
            });
          })
        });
      });
    });
  }
}

module.exports = viewController