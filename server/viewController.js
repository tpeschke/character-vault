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
        character.strData = strData[0] || {}
        return true
      }))
      promiseArray.push(db.get.stats.dex(character.dex).then(dexData => {
        character.dexData = dexData[0] || {}
        return true
      }))
      promiseArray.push(db.get.stats.cons(character.con).then(conData => {
        character.conData = conData[0] || {}
        return true
      }))
      promiseArray.push(db.get.stats.int(character.int).then(intData => {
        character.intData = intData[0] || {}
        return true
      }))
      promiseArray.push(db.get.stats.wis(character.wis).then(wisData => {
        character.wisData = wisData[0] || {}
        return true
      }))
      promiseArray.push(db.get.stats.cha(character.cha).then(chaData => {
        character.chaData = chaData[0] || {}
        return true
      }))
      promiseArray.push(db.get.goals(character.id).then(goals => {
        character.goals = goals
        return true
      }))
      promiseArray.push(db.get.devotions(character.id).then(devotions => {
        character.devotions = devotions
        return true
      }))
      promiseArray.push(db.get.flaws(character.id).then(flaws => {
        character.flaws = flaws
        return true
      }))
      promiseArray.push(db.get.traits(character.id).then(traits => {
        character.traits = traits
        return true
      }))
      promiseArray.push(db.get.reputation(character.id).then(reputation => {
        character.reputation = reputation
        return true
      }))
      promiseArray.push(db.get.gearone(character.id).then(gearone => {
        character.gearone = gearone
        return true
      }))
      promiseArray.push(db.get.geartwo(character.id).then(geartwo => {
        character.geartwo = geartwo
        return true
      }))
      promiseArray.push(db.get.gearthree(character.id).then(gearthree => {
        character.gearthree = gearthree
        return true
      }))
      promiseArray.push(db.get.gearfour(character.id).then(gearfour => {
        character.gearfour = gearfour
        return true
      }))
      promiseArray.push(db.get.weaponone(character.id).then(weaponone => {
        character = {...weaponone[0], ...character}
        return true
      }))
      promiseArray.push(db.get.weapontwo(character.id).then(weapontwo => {
        character = {...weapontwo[0], ...character}
        return true
      }))
      promiseArray.push(db.get.weaponthree(character.id).then(weaponthree => {
        character = {...weaponthree[0], ...character}
        return true
      }))
      promiseArray.push(db.get.weaponfour(character.id).then(weaponfour => {
        character = {...weaponfour[0], ...character}
        return true
      }))
      promiseArray.push(db.get.armor(character.id).then(armor => {
        character = {...armor[0], ...character}
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