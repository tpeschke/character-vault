const puppeteer = require('puppeteer')
  , { puppeteerEndpoint } = require('./server-config')

viewController = {
  viewUsersCharacters: function (req, res) {
    const db = req.app.get('db')
    let { id } = req.user
    db.get.allUsersCharacters(id).then(data => {
      res.send(data)
    })
  },
  viewAllCharacters: function (req, res) {
    const db = req.app.get('db')
    let id = 0
    if (req.user && req.user.id) {
      id = req.user.id
    }
    db.get.allCharacters(id).then(data => {
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
    return db.get.character(req.params.id).then(data => {
      let character = data[0]
        , promiseArray = []
      promiseArray.push(db.get.damageone(character.id).then(damageone => {
        character.damageone = damageone
        return true
      }))
      promiseArray.push(db.get.damagetwo(character.id).then(damagetwo => {
        character.damagetwo = damagetwo
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
        if (weaponone[0]) {
          weaponone[0].position = 'one'
          character.weaponone = weaponone[0]
        } else {
          character.weaponone = { position: 'one' }
        }
        return true
      }))
      promiseArray.push(db.get.weapontwo(character.id).then(weapontwo => {
        if (weapontwo[0]) {
          weapontwo[0].position = 'two'
          character.weapontwo = weapontwo[0]
        } else {
          character.weapontwo = { position: 'two' }
        }
        return true
      }))
      promiseArray.push(db.get.weaponthree(character.id).then(weaponthree => {
        if (weaponthree[0]) {
          weaponthree[0].position = 'three'
          character.weaponthree = weaponthree[0]
        } else {
          character.weaponthree = { position: 'three' }
        }
        return true
      }))
      promiseArray.push(db.get.weaponfour(character.id).then(weaponfour => {
        if (weaponfour[0]) {
          weaponfour[0].position = 'four'
          character.weaponfour = weaponfour[0]
        } else {
          character.weaponfour = { position: 'four' }
        }
        return true
      }))
      promiseArray.push(db.get.armor(character.id).then(armor => {
        character = { ...armor[0], ...character }
      }))
      promiseArray.push(db.get.shield(character.id).then(shield => {
        character = { ...shield[0], ...character }
      }))
      promiseArray.push(db.get.skillsuites(character.id).then(skillsuites => {
        let emptySkillSuites = [
          { skillsuiteid: 1, skillsuitename: 'Athletics', skillsuitebasecost: 30, rank: 0 },
          { skillsuiteid: 2, skillsuitename: 'Lore', skillsuitebasecost: 47, rank: 0 },
          { skillsuiteid: 3, skillsuitename: 'Streetwise', skillsuitebasecost: 54, rank: 0 },
          { skillsuiteid: 4, skillsuitename: 'Survival', skillsuitebasecost: 61, rank: 0 },
          { skillsuiteid: 5, skillsuitename: 'Tactics', skillsuitebasecost: 53, rank: 0 },
          { skillsuiteid: 6, skillsuitename: 'Trades', skillsuitebasecost: 56, rank: 0 },
          { skillsuiteid: 7, skillsuitename: 'Weirdcraft', skillsuitebasecost: 84, rank: 0 },
        ]

        for (let i = 0; i < emptySkillSuites.length; i++) {
          for (let x = 0; x < skillsuites.length; x++) {
            if (skillsuites[x].skillsuiteid === emptySkillSuites[i].skillsuiteid) {
              emptySkillSuites[i] = skillsuites[x]
              x = skillsuites.length
            }
          }
        }
        character.skillsuites = emptySkillSuites
      }))
      promiseArray.push(db.get.skills(character.id).then(skills => {
        character.skills = skills
        return true
      }))
      promiseArray.push(db.get.nativeLanguage(character.id).then(nativelanguage => {
        character.nativelanguage = nativelanguage[0] || {}
      }))

      return Promise.all(promiseArray).then(_ => {
        character.owned = req.user ? req.user.id === character.userid : null
        return character
      })
    })
  },
  downloadCharacters: function (req, res) {
    const db = req.app.get('db')
    try {
      puppeteer.launch().then(browser => {
        browser.newPage().then(page => {
          page.goto(`${puppeteerEndpoint}/download/${req.params.id}`, {
            waitUntil: "networkidle2"
          }).then(_ => {
            page.waitForSelector('div#loaded').then(_ => {
              page.waitForTimeout(3000).then(_ => {
                page.pdf({
                  format: "Letter",
                  printBackground: true
                }).then(pdf => {
                  db.get.characterName(req.params.id.split('.')[0]).then(data => {
                    if (data[0].name === "" || !data[0].name) {
                      if (data[0].primarya) {
                        data[0].name = `Unamed ${data[0].primarya}`
                      } else {
                        data[0].name = "Unamed Character"
                      }
                    }
                    res.set("Content-Disposition", `inline;filename=${data[0].name}.pdf`)
                    res.send(pdf)
                    browser.close();
                  })
                })
              });
            })
          });
        });
      });
    } catch (e) {
      res.send(e)
    }
  },
  getCharacterForCombatCounter: (req, res) => {
    const db = req.app.get('db')
      db.get.characterForCombat(req.params.id).then(roughCharacter => {
        roughCharacter = roughCharacter[0]
        let character = {
          name: roughCharacter.name,
          recovery: null,
          weapons: []
        }
        if (!roughCharacter.vitality || roughCharacter.vitality === 0) {
          character.trauma = Math.floor((roughCharacter.vitalityroll + roughCharacter.sizemod + roughCharacter.con) / 2)
        } else {
          character.trauma = Math.floor(roughCharacter.vitality / 2)
        }
        
        let finalPromise = [];
        finalPromise.push(db.get.weaponsForCombat(req.params.id).then(result => {
          result.forEach(val => {
            if (val.baserecovery) {
              character.weapons.push({
                weaponid: val.weaponid,
                name: val.name,
                recovery: val.baserecovery + +val.miscrecovery+val.trainrecovery 
              })
            }
          })
          if (character.weapons[0]) {
            character.recovery = character.weapons[0].recovery
          }
          return true
        }))
        Promise.all(finalPromise).then(actualFinal => {
          if (character.name && character.recovery) {
            res.send(character)
          } else {
            res.send({ message: "This id doesn't belong to a valid character", color: 'red' })
          }
        })
      })
  }
}

module.exports = viewController