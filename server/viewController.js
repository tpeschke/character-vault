const puppeteer = require('puppeteer')
    , { puppeteerEndpoint } = require('./server-config')

viewController = {
  viewUsersCharacters: function (req, res) {
    const db = req.app.get('db')
    let {id} = req.user
    db.get.allUsersCharacters(id).then(data=> {
      res.send(data)
    })
  },
  viewAllCharacters: function (req, res) {
    const db = req.app.get('db')
    let id = 0
    if (req.user && req.user.id) {
      id = req.user.id
    }
    db.get.allCharacters(id).then(data=> {
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
      promiseArray.push(db.get.stats.str(character?.str || 1).then(strData => {
        character.strData = strData[0]
        return true
      }))
      promiseArray.push(db.get.stats.dex(character?.dex || 1).then(dexData => {
        character.dexData = dexData[0]
        return true
      }))
      promiseArray.push(db.get.stats.cons(character?.con || 1).then(conData => {
        character.conData = conData[0]
        return true
      }))
      promiseArray.push(db.get.stats.int(character?.int || 1).then(intData => {
        character.intData = intData[0]
        return true
      }))
      promiseArray.push(db.get.stats.wis(character?.wis || 1).then(wisData => {
        character.wisData = wisData[0]
        return true
      }))
      promiseArray.push(db.get.stats.cha(character?.cha || 1).then(chaData => {
        character.chaData = chaData[0]
        return true
      }))
      promiseArray.push(db.get.damage(character.id).then(damage => {
        character.damage = damage
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
      promiseArray.push(db.get.shield(character.id).then(shield => {
        character = {...shield[0], ...character}
      }))
      promiseArray.push(db.get.skillsuites(character.id).then(skillsuites => {
        let emptySkillSuites = [
          {skillsuiteid: 1, skillsuitename:	'Athletics', skillsuitebasecost: 30, rank: 0},
          {skillsuiteid: 2, skillsuitename:	'Lore', skillsuitebasecost: 47, rank: 0},
          {skillsuiteid: 3, skillsuitename:	'Streetwise', skillsuitebasecost: 54, rank: 0},
          {skillsuiteid: 4, skillsuitename:	'Survival', skillsuitebasecost: 61, rank: 0},
          {skillsuiteid: 5, skillsuitename:	'Tactics', skillsuitebasecost: 53, rank: 0},
          {skillsuiteid: 6, skillsuitename:	'Trades', skillsuitebasecost: 56, rank: 0},
          {skillsuiteid: 7, skillsuitename:	'Weirdcraft', skillsuitebasecost: 84, rank: 0},
        ]

        skillsuites.forEach(skillsuite => {
          emptySkillSuites[skillsuite.skillsuiteid] = skillsuite
        })
        
        character.skillsuites = emptySkillSuites
      }))
      promiseArray.push(db.get.skillone(character.id).then(skillone => {
        character.skillone = skillone
        return true
      }))
      promiseArray.push(db.get.skilltwo(character.id).then(skilltwo => {
        character.skilltwo = skilltwo
        return true
      }))
      promiseArray.push(db.get.skillthree(character.id).then(skillthree => {
        character.skillthree = skillthree
        return true
      }))
      promiseArray.push(db.get.nativeLanguage(character.id).then(nativelanguage => {
        character.nativelanguage = nativelanguage[0] || {}
      }))
      
      return Promise.all(promiseArray).then(_=> {
        character.owned = req.user ? req.user.id === character.userid : null
        return character
      })
    })
  },
  downloadCharacters: function (req, res) {
    const db = req.app.get('db')
    puppeteer.launch().then(browser => {
      browser.newPage().then(page => {
        page.goto(`${puppeteerEndpoint}/download/${req.params.id}`, {
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