viewController = {
  isUserAboveLimit: function (req, res) {
    const db = req.app.get('db')
    if (req.user.id === 1) {
      res.send({ isUserAboveLimit: false })
    } else {
      db.get.userCharacterCount(req.user.id).then(result => {
        let count = result[0].count
        let limit = (req.user.patreon * 20) + 10
        res.send({ isUserAboveLimit: count >= limit })
      })
    }
  },
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
    if (req.query.template) {
      let characterid = req.params.id
      req.params.id = +req.query.template
      viewController.assembleCharacter(req).then((character) => {
        delete character.armorid
        delete character.characterid
        delete character.shieldid
        character.damageone = []
        character.damagetwo = []
        character.id = characterid
        character.name = character.name + " - copy"
        character.nativelanguage.characterid = characterid
        character.userid = req.user.id

        character.weaponfour.characterid = characterid
        delete character.weaponfour.weaponid
        character.weaponone.characterid = characterid
        delete character.weaponone.weaponid
        character.weaponthree.characterid = characterid
        delete character.weaponthree.weaponid
        character.weapontwo.characterid = characterid
        delete character.weapontwo.weaponid

        character.goals = character.goals.map(goal => {
          goal.characterid = characterid
          delete goal.id
          return goal
        })
        character.devotions = character.devotions.map(devotion => {
          devotion.characterid = characterid
          delete devotion.id
          return devotion
        })
        character.flaws = character.flaws.map(flaw => {
          flaw.characterid = characterid
          delete flaw.id
          return flaw
        })
        character.reputation = character.reputation.map(rep => {
          rep.characterid = characterid
          delete rep.id
          return rep
        })
        character.traits = character.traits.map(trait => {
          trait.characterid = characterid
          delete trait.id
          return trait
        })

        character.gearone = character.gearone.map(gear => {
          gear.characterid = characterid
          delete gear.id
          return gear
        })
        character.geartwo = character.geartwo.map(gear => {
          gear.characterid = characterid
          delete gear.id
          return gear
        })
        character.gearthree = character.gearthree.map(gear => {
          gear.characterid = characterid
          delete gear.id
          return gear
        })
        character.gearfour = character.gearfour.map(gear => {
          gear.characterid = characterid
          delete gear.id
          return gear
        })

        character.skillsuites = character.skillsuites.map(suite => {
          delete suite.characterskillsuitesid
          return suite
        })
        character.skills = character.skills.map(skill => {
          skill.characterid = characterid
          delete skill.id
          return skill
        })

        character.combatskillsuites = character.combatskillsuites.map(suite => {
          delete suite.characterskillsuitesid
          return suite
        })
        character.combatskills = character.combatskills.map(skill => {
          skill.characterid = characterid
          delete skill.id
          return skill
        })

        res.send(character)
      })
    } else {
      viewController.assembleCharacter(req).then(character => {
        res.send(character)
      })
    }
  },
  assembleCharacter: async function (req) {
    const db = req.app.get('db')
    return db.get.character(req.params.id).then(data => {
      let character = data[0]
        , promiseArray = []

      if (character) {
        promiseArray.push(db.get.damageone(character.id).then(damageone => {
          character.damageone = damageone
          return true
        }).catch(e => console.log("----------------------------- damage one -----------------------------", e)))
        promiseArray.push(db.get.damagetwo(character.id).then(damagetwo => {
          character.damagetwo = damagetwo
          return true
        }).catch(e => console.log("----------------------------- damage two -----------------------------", e)))
        promiseArray.push(db.get.goals(character.id).then(goals => {
          character.goals = goals
          return true
        }).catch(e => console.log("----------------------------- goals -----------------------------", e)))
        promiseArray.push(db.get.devotions(character.id).then(devotions => {
          character.devotions = devotions
          return true
        }).catch(e => console.log("----------------------------- devotions -----------------------------", e)))
        promiseArray.push(db.get.flaws(character.id).then(flaws => {
          character.flaws = flaws
          return true
        }).catch(e => console.log("----------------------------- flaws -----------------------------", e)))
        promiseArray.push(db.get.traits(character.id).then(traits => {
          character.traits = traits
          return true
        }).catch(e => console.log("----------------------------- traits -----------------------------", e)))
        promiseArray.push(db.get.descriptions(character.id).then(descriptions => {
          character.descriptions = descriptions
          return true
        }).catch(e => console.log("----------------------------- descriptions -----------------------------", e)))
        promiseArray.push(db.get.reputation(character.id).then(reputation => {
          character.reputation = reputation
          return true
        }).catch(e => console.log("----------------------------- reputation -----------------------------", e)))
        promiseArray.push(db.get.gearone(character.id).then(gearone => {
          character.gearone = gearone
          return true
        }).catch(e => console.log("----------------------------- gear one -----------------------------", e)))
        promiseArray.push(db.get.geartwo(character.id).then(geartwo => {
          character.geartwo = geartwo
          return true
        }).catch(e => console.log("----------------------------- gear two -----------------------------", e)))
        promiseArray.push(db.get.gearthree(character.id).then(gearthree => {
          character.gearthree = gearthree
          return true
        }).catch(e => console.log("----------------------------- gear three -----------------------------", e)))
        promiseArray.push(db.get.gearfour(character.id).then(gearfour => {
          character.gearfour = gearfour
          return true
        }).catch(e => console.log("----------------------------- gear four -----------------------------", e)))
        promiseArray.push(db.get.weaponone(character.id).then(weaponone => {
          if (weaponone[0]) {
            weaponone[0].position = 'one'
            character.weaponone = weaponone[0]
          } else {
            character.weaponone = { position: 'one' }
          }
          return true
        }).catch(e => console.log("----------------------------- weapon one -----------------------------", e)))
        promiseArray.push(db.get.weapontwo(character.id).then(weapontwo => {
          if (weapontwo[0]) {
            weapontwo[0].position = 'two'
            character.weapontwo = weapontwo[0]
          } else {
            character.weapontwo = { position: 'two' }
          }
          return true
        }).catch(e => console.log("----------------------------- weapon two -----------------------------", e)))
        promiseArray.push(db.get.weaponthree(character.id).then(weaponthree => {
          if (weaponthree[0]) {
            weaponthree[0].position = 'three'
            character.weaponthree = weaponthree[0]
          } else {
            character.weaponthree = { position: 'three' }
          }
          return true
        }).catch(e => console.log("----------------------------- weapon three -----------------------------", e)))
        promiseArray.push(db.get.weaponfour(character.id).then(weaponfour => {
          if (weaponfour[0]) {
            weaponfour[0].position = 'four'
            character.weaponfour = weaponfour[0]
          } else {
            character.weaponfour = { position: 'four' }
          }
          return true
        }).catch(e => console.log("----------------------------- weapon four -----------------------------", e)))
        promiseArray.push(db.get.armor(character.id).then(armor => {
          character = { ...armor[0], ...character }
        }).catch(e => console.log("----------------------------- armor -----------------------------", e)))
        promiseArray.push(db.get.shield(character.id).then(shield => {
          character = { ...shield[0], ...character }
        }).catch(e => console.log("----------------------------- shield -----------------------------", e)))
        promiseArray.push(db.get.skillsuites(character.id).then(skillsuites => {
          let emptySkillSuites = [
            { skillsuiteid: 1, skillsuitename: 'Athletics', skillsuitebasecost: 30, rank: 0, trained: false },
            { skillsuiteid: 2, skillsuitename: 'Lore', skillsuitebasecost: 47, rank: 0, trained: false },
            { skillsuiteid: 3, skillsuitename: 'Streetwise', skillsuitebasecost: 54, rank: 0, trained: false },
            { skillsuiteid: 4, skillsuitename: 'Survival', skillsuitebasecost: 61, rank: 0, trained: false },
            { skillsuiteid: 5, skillsuitename: 'Strategy', skillsuitebasecost: 53, rank: 0, trained: false },
            { skillsuiteid: 6, skillsuitename: 'Trades', skillsuitebasecost: 56, rank: 0, trained: false },
            { skillsuiteid: 7, skillsuitename: 'Weirdcraft', skillsuitebasecost: 84, rank: 0, trained: false },
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
        }).catch(e => console.log("----------------------------- skill suites -----------------------------", e)))
        promiseArray.push(db.get.skills(character.id).then(skills => {
          character.skills = skills
          return true
        }).catch(e => console.log("----------------------------- skills -----------------------------", e)))
        promiseArray.push(db.get.skillsuitescombat(character.id).then(skillsuites => {
          let emptySkillSuites = [
            { skillsuiteid: 1, skillsuitename: 'Armor', skillsuitebasecost: 30, rank: 0, trained: false },
            { skillsuiteid: 2, skillsuitename: 'Melee', skillsuitebasecost: 30, rank: 0, trained: false },
            { skillsuiteid: 3, skillsuitename: 'Ranged', skillsuitebasecost: 30, rank: 0, trained: false },
            { skillsuiteid: 4, skillsuitename: 'Shield', skillsuitebasecost: 30, rank: 0, trained: false },
            { skillsuiteid: 5, skillsuitename: 'Unarmed', skillsuitebasecost: 30, rank: 0, trained: false },
          ]
  
          for (let i = 0; i < emptySkillSuites.length; i++) {
            for (let x = 0; x < skillsuites.length; x++) {
              if (skillsuites[x].skillsuiteid === emptySkillSuites[i].skillsuiteid) {
                emptySkillSuites[i] = skillsuites[x]
                x = skillsuites.length
              }
            }
          }
  
          character.combatskillsuites = emptySkillSuites
        }).catch(e => console.log("----------------------------- combat skill suites -----------------------------", e)))
        promiseArray.push(db.get.skillscombat(character.id).then(skills => {
          character.combatskills = skills
          return true
        }).catch(e => console.log("----------------------------- combat skills -----------------------------", e)))
        promiseArray.push(db.get.nativeLanguage(character.id).then(nativelanguage => {
          character.nativelanguage = nativelanguage[0] || {}
        }).catch(e => console.log("----------------------------- native languages -----------------------------", e)))
      }

      return Promise.all(promiseArray).then(_ => {
        if (character) {
          character.owned = req.user ? req.user.id === character.userid || req.user.id === 1 : null
        }
        return character
      })
    })
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
              recovery: val.baserecovery + +val.miscrecovery + val.trainrecovery
            })
          }
        })
        if (character.weapons[0]) {
          character.recovery = character.weapons[0].recovery
          character.selectedId = character.weapons[0].weaponid
          character.selectedName = character.weapons[0].name
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