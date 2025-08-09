const { sendErrorForwardNoFile, checkForContentTypeBeforeSending } = require('./helpers')
const { query } = require('../db/index')
const generalGets = require('../db/general/generalGets')
const combatGets = require('../db/combat/combatGets')
const socialGets = require('../db/social/socialGets')
const gearGets = require('../db/gear/gearGets')
const skillGets = require('../db/skill/skillGets')
const sendErrorForward = sendErrorForwardNoFile('view controller')

viewController = {
  isUserAboveLimit: function (req, res) {
    if (req.user.id === 1) {
      checkForContentTypeBeforeSending(res, { isUserAboveLimit: false })
    } else {
      query(generalGets.userCharacterCount, [req.user.id]).then(result => {
        let count = result[0].count
        let limit = (req.user.patreon * 20) + 10
        checkForContentTypeBeforeSending(res, { isUserAboveLimit: count >= limit })
      }).catch(e => sendErrorForward('is user above limit', e.message, res))
    }
  },
  viewUsersCharacters: function (req, res) {
    let { id } = req.user
    query(generalGets.allUsersCharacters, [id]).then(data => {
      checkForContentTypeBeforeSending(res, data)
    }).catch(e => sendErrorForward('view users characters', e.message, res))
  },
  viewAllCharacters: function (req, res) {
    let id = 0
    if (req.user && req.user.id) {
      id = req.user.id
    }
    query(generalGets.allCharacters, [id]).then(data => {
      checkForContentTypeBeforeSending(res, data)
    }).catch(e => sendErrorForward('view all characters', e.message, res))
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

        checkForContentTypeBeforeSending(res, character)
      }).catch(e => sendErrorForward('assemble one', e.message, res))
    } else {
      viewController.assembleCharacter(req).then(character => {
        checkForContentTypeBeforeSending(res, character)
      }).catch(e => sendErrorForward('assemble two', e.message, res))
    }
  },
  assembleCharacter: async function (req) {
    return query(generalGets.character, [req.params.id]).then(data => {
      let character = data[0]
        , promiseArray = []

      if (character) {
        promiseArray.push(query(combatGets.damageone, [character.id]).then(damageone => {
          character.damageone = damageone
          return true
        }).catch(e => sendErrorForward('damage one', e.message, res)))
        promiseArray.push(query(combatGets.damagetwo, [character.id]).then(damagetwo => {
          character.damagetwo = damagetwo
          return true
        }).catch(e => sendErrorForward('damage two', e.message, res)))
        promiseArray.push(query(socialGets.goals, [character.id]).then(goals => {
          character.goals = goals
          return true
        }).catch(e => sendErrorForward('goals', e.message, res)))
        promiseArray.push(query(socialGets.devotions, [character.id]).then(devotions => {
          character.devotions = devotions
          return true
        }).catch(e => sendErrorForward('devotions', e.message, res)))
        promiseArray.push(query(socialGets.flaws, [character.id]).then(flaws => {
          character.flaws = flaws
          return true
        }).catch(e => sendErrorForward('flaws', e.message, res)))
        promiseArray.push(query(socialGets.traits, [character.id]).then(traits => {
          character.traits = traits
          return true
        }).catch(e => sendErrorForward('convictions', e.message, res)))
        promiseArray.push(query(socialGets.descriptions, character.id).then(descriptions => {
          character.descriptions = descriptions
          return true
        }).catch(e => sendErrorForward('descriptions', e.message, res)))
        promiseArray.push(query(socialGets.reputation, character.id).then(reputation => {
          character.reputation = reputation
          return true
        }).catch(e => sendErrorForward('reputations', e.message, res)))
        promiseArray.push(query(gearGets.gearone, character.id).then(gearone => {
          character.gearone = gearone
          return true
        }).catch(e => sendErrorForward('gear one', e.message, res)))
        promiseArray.push(query(gearGets.geartwo, character.id).then(geartwo => {
          character.geartwo = geartwo
          return true
        }).catch(e => sendErrorForward('gear two', e.message, res)))
        promiseArray.push(query(gearGets.gearthree, character.id).then(gearthree => {
          character.gearthree = gearthree
          return true
        }).catch(e => sendErrorForward('gear three', e.message, res)))
        promiseArray.push(query(gearGets.gearfour, character.id).then(gearfour => {
          character.gearfour = gearfour
          return true
        }).catch(e => sendErrorForward('gear four', e.message, res)))
        promiseArray.push(query(gearGets.weaponone, character.id).then(weaponone => {
          if (weaponone[0]) {
            weaponone[0].position = 'one'
            character.weaponone = weaponone[0]
          } else {
            character.weaponone = { position: 'one' }
          }
          return true
        }).catch(e => sendErrorForward('weapon one', e.message, res)))
        promiseArray.push(query(combatGets.weapontwo, character.id).then(weapontwo => {
          if (weapontwo[0]) {
            weapontwo[0].position = 'two'
            character.weapontwo = weapontwo[0]
          } else {
            character.weapontwo = { position: 'two' }
          }
          return true
        }).catch(e => sendErrorForward('twapon two', e.message, res)))
        promiseArray.push(query(combatGets.weaponthree, character.id).then(weaponthree => {
          if (weaponthree[0]) {
            weaponthree[0].position = 'three'
            character.weaponthree = weaponthree[0]
          } else {
            character.weaponthree = { position: 'three' }
          }
          return true
        }).catch(e => sendErrorForward('weapon three', e.message, res)))
        promiseArray.push(query(combatGets.weaponfour, character.id).then(weaponfour => {
          if (weaponfour[0]) {
            weaponfour[0].position = 'four'
            character.weaponfour = weaponfour[0]
          } else {
            character.weaponfour = { position: 'four' }
          }
          return true
        }).catch(e => sendErrorForward('weapon four', e.message, res)))
        promiseArray.push(query(combatGets.armor, character.id).then(armor => {
          character = { ...armor[0], ...character }
        }).catch(e => sendErrorForward('armor', e.message, res)))
        promiseArray.push(query(combatGets.shield, character.id).then(shield => {
          character = { ...shield[0], ...character }
        }).catch(e => sendErrorForward('shield', e.message, res)))
        promiseArray.push(query(skillGets.skillsuites, character.id).then(skillsuites => {
          let emptySkillSuites = [
            { skillsuiteid: 1, skillsuitename: 'Athletics', skillsuitebasecost: 30, rank: 0, trained: false },
            { skillsuiteid: 2, skillsuitename: 'Lore', skillsuitebasecost: 30, rank: 0, trained: false },
            { skillsuiteid: 3, skillsuitename: 'Streetwise', skillsuitebasecost: 30, rank: 0, trained: false },
            { skillsuiteid: 4, skillsuitename: 'Survival', skillsuitebasecost: 30, rank: 0, trained: false },
            { skillsuiteid: 5, skillsuitename: 'Strategy', skillsuitebasecost: 30, rank: 0, trained: false },
            { skillsuiteid: 6, skillsuitename: 'Trades', skillsuitebasecost: 30, rank: 0, trained: false },
            { skillsuiteid: 7, skillsuitename: 'Weirdcraft', skillsuitebasecost: 40, rank: 0, trained: false },
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
        }).catch(e => sendErrorForward('skill suites', e.message, res)))
        promiseArray.push(query(skillGets.skills, character.id).then(skills => {
          character.skills = skills
          return true
        }).catch(e => sendErrorForward('skills', e.message, res)))
        promiseArray.push(query(skillGets.skillsuitescombat, character.id).then(skillsuites => {
          let emptySkillSuites = [
            { skillsuiteid: 1, skillsuitename: 'Armor', skillsuitebasecost: 40, rank: 0, trained: false },
            { skillsuiteid: 2, skillsuitename: 'Melee', skillsuitebasecost: 40, rank: 0, trained: false },
            { skillsuiteid: 3, skillsuitename: 'Ranged', skillsuitebasecost: 40, rank: 0, trained: false },
            { skillsuiteid: 4, skillsuitename: 'Shield', skillsuitebasecost: 40, rank: 0, trained: false },
            { skillsuiteid: 5, skillsuitename: 'Unarmed', skillsuitebasecost: 40, rank: 0, trained: false },
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
        }).catch(e => sendErrorForward('combat skill suites', e.message, res)))
        promiseArray.push(query(combatGets.skillscombat, character.id).then(skills => {
          character.combatskills = skills
          return true
        }).catch(e => sendErrorForward('combat skills', e.message, res)))
        promiseArray.push(query(skillGets.nativeLanguage, character.id).then(nativelanguage => {
          character.nativelanguage = nativelanguage[0] || {}
        }).catch(e => sendErrorForward('native language', e.message, res)))
      }

      return Promise.all(promiseArray).then(_ => {
        if (character) {
          character.owned = req.user ? req.user.id === character.userid || req.user.id === 1 : null
        }
        return character
      })
    }).catch(e => sendErrorForward('main final promise', e.message, res))
  },
  getCharacterForCombatCounter: (req, res) => {
    query(combatGets.characterForCombat, req.params.id).then(roughCharacter => {
      roughCharacter = roughCharacter[0]
      let character = {
        name: roughCharacter.name,
        recovery: null,
        weapons: []
      }
      if (!roughCharacter.vitality || roughCharacter.vitality === 0) {
        character.trauma = Math.floor((roughCharacter.vitalityroll + roughCharacter.sizemod + roughCharacter.con) / 4)
      } else {
        character.trauma = Math.floor(roughCharacter.vitality / 4)
      }

      let finalPromise = [];
      finalPromise.push(query(skillGets.weaponsForCombat, req.params.id).then(result => {
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
      })).catch(e => sendErrorForward('combat weapons', e.message, res))
      Promise.all(finalPromise).then(actualFinal => {
        if (character.name && character.recovery) {
          checkForContentTypeBeforeSending(res, character)
        } else {
          checkForContentTypeBeforeSending(res, { message: "This id doesn't belong to a valid character", color: 'red' })
        }
      }).catch(e => sendErrorForward('combat final promise', e.message, res))
    }).catch(e => sendErrorForward('get character for combat', e.message, res))
  }
}

module.exports = viewController