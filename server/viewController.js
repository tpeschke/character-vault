const puppeteer = require('puppeteer')

module.exports = {
  viewUsersCharacters: function (req, res) {
    const db = req.app.get('db')
    db.get.allUsersCharacters(req.user.id).then(data=> {
      res.send(data)
    })
  },
  viewCharacter: function (req, res) {
    const db = req.app.get('db')
    db.get.character(req.params.id).then(data=> {
      res.send(data[0])
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