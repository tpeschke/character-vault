const { assembleCharacter } = require('./viewController')
const { sendErrorForwardNoFile, checkForContentTypeBeforeSending } = require('./helpers')
const { query } = require('../db/index')
const generalInserts = require('../db/general/generalInserts')
const generalDeletes = require('../db/general/generalDeletes')
const generalGets = require('../db/general/generalGets')
const socialDeletes = require('../db/social/socialDeletes')
const socialInserts = require('../db/social/socialInserts')
const gearDeletes = require('../db/gear/gearDeletes')
const gearInserts = require('../db/gear/gearInserts')
const combatInserts = require('../db/combat/combatInserts')
const combatUpdates = require('../db/combat/combatUpdates')
const combatDeletes = require('../db/combat/combatDeletes')
const skillDeletes = require('../db/skill/skillDeletes')
const skillInserts = require('../db/skill/skillInserts')
const skillUpdates = require('../db/skill/skillUpdates')
const sendErrorForward = sendErrorForwardNoFile('editor controller')

function setToMinAndMax(value = 0, min, max) {
    return setToMax(setToMin(value, min), max)
}

function setToMin(value = 0, min) {
    return +value >= min ? +value : min
}

function setToMax(value = 0, max) {
    return +value <= max ? +value : max
}
editController = {
    addCharacter: (req, res) => {
        query(generalInserts.character, req.user.id).then(data => {
            req.params.id = data[0].id
            assembleCharacter(req).then((character) => {
                checkForContentTypeBeforeSending(res, data[0])
            }).catch(e => sendErrorForward('assembling character', e.message, res))
        }).catch(e => sendErrorForward('upsert character', e.message, res))
    },
    removeCharacter: (req, res) => {
        query(generalDeletes.all, req.params.characterid).then(_ => {
            checkForContentTypeBeforeSending(res, { message: 'character removed' })
        })
    },
    updateSingleThing: (req, res) => {
        let { body } = req
            , { characterid } = req.params
            , keyName = Object.keys(body)[0]
            , table = 'cvcharactermain'
            , idname = 'id'

        query(generalGets.characterUserId, characterid).then(idresult => {
            if (idresult[0].userid === req.user.id) {
                if (keyName.includes('misc') || keyName.includes('using') || keyName.includes('thrown')) {
                    if (keyName.includes('using') || keyName.includes('thrown')) {
                        body[keyName] = !!body[keyName]
                    }

                    if (keyName.includes('armor')) {
                        table = 'cvarmor'
                    } else if (keyName.includes('shield')) {
                        table = 'cvshield'
                    } else if (keyName.includes('one')) {
                        table = 'weaponone'
                    } else if (keyName.includes('two')) {
                        table = 'weapontwo'
                    } else if (keyName.includes('three')) {
                        table = 'weaponthree'
                    } else if (keyName.includes('four') || keyName.includes('thrownweapon')) {
                        table = 'weaponfour'
                    }
                    idname = 'characterid'
                }

                if (Array.isArray(body[keyName])) {
                    let promiseArray = []
                    console.log(body, keyName)
                    // promiseArray.push(query([keyName], [characterid, [0, ...body[keyName].map(table => table.id)]]).then(_ => {
                    //     return body[keyName].map(({ id, value, title }) => {
                    //         return db.upsert[keyName](id, characterid, title, value)
                    //     })
                    // }).catch(e => sendErrorForward('update single thing array', e.message, res)))

                    Promise.all(promiseArray).then(_ => {
                        checkForContentTypeBeforeSending(res, { messsage: "updated" })
                    })
                } else {
                    query(`update ${table} set ${keyName} = $1 where ${idname} = $2`, [body[keyName], characterid]).then(result => {
                        checkForContentTypeBeforeSending(res, { messsage: "updated" })
                    }).catch(e => sendErrorForward('update single thing single', e.message, res))
                }
            } else {
                checkForContentTypeBeforeSending(res, { messsage: "not updated" })
            }
        }).catch(e => sendErrorForward('get user id single thing', e.message, res))
    },
    updateSingleThingOnObject: (req, res) => {
        let { object, key, value } = req.body
            , { characterid } = req.params
        if (key === 'thrownweapon') {
            if (value === 1) {
                value = true
            } else {
                value = false
            }
        }
        query(generalGets.characterUserId, characterid).then(idresult => {
            if (idresult[0].userid === req.user.id) {
                query(`update ${object} set ${key} = $1 where characterid = $2`, [value, characterid]).then(result => {
                    checkForContentTypeBeforeSending(res, { messsage: "updated" })
                }).catch(e => sendErrorForward('update single thing object', e.message, res))
            } else {
                checkForContentTypeBeforeSending(res, { messsage: "not updated" })
            }
        }).catch(e => sendErrorForward('get user id single thing on object', e.message, res))
    },
    updateOrAddCharacter: (req, res) => {
        let { id, userid, name, race, primarya, secondarya, primarylevel, secondarylevel, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitality, vitalitydice, vitalityroll, wis, int, level, temperament, goals, devotions, flaws, reputation, contacts, abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, crawl, walk, jog,
            run, sprint, weaponone, weapontwo, weaponthree, weaponfour, armorid, armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainfatigue, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscfatigue, armorbasedef, armorbaserecovery, armorbasefatiguemod, armorbaseinit, shieldname, shieldflanks, shielddr, shieldsize, shieldcover, shieldbonus, shieldbasedef,
            shieldbaseparry, shieldbasefatigue, shieldbasebreak, shieldtraindef, shieldtrainparry, shieldtrainfatigue, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscfatigue, shieldid, skillsuites, skills, nativelanguage, skilladept, traits, martialadept, combatskills, combatskillsuites, secretgeneralnotes, descriptions, temperamentrank, stressroll, stressdie, currentfavor, stresslockout, strength } = req.body
        skilladept = setToMin(skilladept, 0)
        level = setToMin(level, 1)
        crp = setToMin(crp, 0)
        copper = setToMin(copper, 0)
        silver = setToMin(silver, 0)
        gold = setToMin(gold, 0)
        platinium = setToMin(platinium, 0)
        excurrent = setToMin(excurrent, 0)
        str = setToMinAndMax(str, 1, 23)
        dex = setToMinAndMax(dex, 1, 23)
        con = setToMinAndMax(con, 1, 23)
        int = setToMinAndMax(int, 1, 23)
        wis = setToMinAndMax(wis, 1, 23)
        cha = setToMinAndMax(cha, 1, 23)
        honor = setToMinAndMax(honor, 0, 25)
        stressthreshold = setToMin(stressthreshold, 0)
        sizemod = setToMin(sizemod, 0)
        vitalityroll = setToMin(vitalityroll, 0)
        stressroll = setToMin(stressroll, 0)

        query(generalInserts.characterInfo, [id, req.user.id, name, race, primarya, secondarya, +primarylevel, +secondarylevel, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, +vitality, vitalitydice, vitalityroll, wis, int, level, temperament, contacts, abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, crawl, walk, jog, run, sprint, skilladept, martialadept, secretgeneralnotes, temperamentrank, stressroll, stressdie, currentfavor, stresslockout, strength]).then((data) => {
            req.params.id = id
            let promiseArray = []

            promiseArray.push(query(socialDeletes.goals, [id, [0, ...goals.map(goals => goals.id)]]).then(_ => {
                return goals.map(({ id: goalid, value }) => {
                    return query(socialInserts.goals, [goalid, id, value]).catch(e => sendErrorForward('inner goals', e, res))
                })
            }).catch(e => sendErrorForward('goals', e, res)))

            promiseArray.push(query(socialDeletes.devotions, [id, [0, ...devotions.map(devotions => devotions.id)]]).then(_ => {
                return devotions.map(({ id: devotionid, value, title }) => {
                    return query(socialInserts.devotions, [devotionid, id, title, setToMin(value, 0)]).catch(e => sendErrorForward('inner devotions', e, res))
                })
            }).catch(e => sendErrorForward('devotions', e, res)))

            promiseArray.push(query(socialDeletes.flaws, [id, [0, ...flaws.map(flaws => flaws.id)]]).then(_ => {
                return flaws.map(({ id: flawid, value, title }) => {
                    return query(socialInserts.flaws, [flawid, id, title, value]).catch(e => sendErrorForward('inner flaws', e, res))
                })
            }).catch(e => sendErrorForward('flaws', e, res)))

            promiseArray.push(query(socialDeletes.traits, [id, [0, ...req.body.traits.map(traits => traits.id)]]).then(_ => {
                return req.body.traits.map(({ id: traitsid, value, title }) => {
                    return query(socialInserts.traits, [traitsid, id, title, value]).catch(e => sendErrorForward('inner traits', e, res))
                })
            }).catch(e => sendErrorForward('traits', e, res)))

            promiseArray.push(query(socialDeletes.descriptions, [id, [0, ...req.body.descriptions.map(descriptions => descriptions.id)]]).then(_ => {
                return req.body.descriptions.map(({ id: descriptionsid, value, title }) => {
                    return query(socialInserts.descriptions, [descriptionsid, id, title, value]).catch(e => sendErrorForward('inner descriptions', e, res))
                })
            }).catch(e => sendErrorForward('descriptions', e, res)))

            promiseArray.push(query(socialDeletes.reputation, [id, [0, ...reputation.map(reputation => reputation.id)]]).then(_ => {
                return reputation.map(({ id: reputationid, value }) => {
                    return query(socialInserts.reputation, [reputationid, id, value]).catch(e => sendErrorForward('inner reputation', e, res))
                })
            }).catch(e => sendErrorForward('reputation', e, res)))

            promiseArray.push(query(gearDeletes.gearone, [id, [0, ...gearone.map(gearone => gearone.id)]]).then(_ => {
                return gearone.map(({ id: gearoneid, value, title }) => {
                    return query(gearInserts.gearone, [gearoneid, id, title, value]).catch(e => sendErrorForward('inner gear one', e, res))
                })
            }).catch(e => sendErrorForward('gear one', e, res)))

            promiseArray.push(query(gearDeletes.geartwo, [id, [0, ...geartwo.map(geartwo => geartwo.id)]]).then(_ => {
                return geartwo.map(({ id: geartwoid, value, title }) => {
                    return query(gearInserts.geartwo, [geartwoid, id, title, value]).catch(e => sendErrorForward('inner gear two', e, res))
                })
            }).catch(e => sendErrorForward('gear two', e, res)))

            promiseArray.push(query(gearDeletes.gearthree, [id, [0, ...gearthree.map(gearthree => gearthree.id)]]).then(_ => {
                return gearthree.map(({ id: gearthreeid, value, title }) => {
                    return query(gearInserts.gearthree, [gearthreeid, id, title, value]).catch(e => sendErrorForward('inner gear three', e, res))
                })
            }).catch(e => sendErrorForward('gear three', e, res)))

            promiseArray.push(query(gearDeletes.gearfour, [id, [0, ...gearfour.map(gearfour => gearfour.id)]]).then(_ => {
                return gearfour.map(({ id: gearfourid, value, title }) => {
                    return query(gearInserts.gearfour, [gearfourid, id, title, value]).catch(e => sendErrorForward('inner gear four', e, res))
                })
            }).catch(e => sendErrorForward('gear four', e, res)))

            let { weaponid, trainattack, trainparry, trainrecovery, traindamage, miscattack, miscparry, miscrecovery, miscdamage, miscinit, name, basedamage, baserecovery, baseparry, basemeasure, type, bonus, traits, size } = weaponone
            promiseArray.push(query(combatInserts.weaponone, [weaponid, id, trainattack, trainparry, trainrecovery, traindamage, miscattack, miscparry, miscrecovery, miscdamage, miscinit, name, basedamage, baserecovery, baseparry, basemeasure, type, bonus, traits, size]).catch(e => sendErrorForward('weapon one', e, res)))

            let { weaponid: weaponidtwo, trainattack: trainattacktwo, trainparry: trainparrytwo, trainrecovery: trainrecoverytwo, traindamage: traindamagetwo, miscattack: miscattacktwo, miscparry: miscparrytwo, miscrecovery: miscrecoverytwo, miscdamage: miscdamagetwo, miscinit: miscinittwo, name: nametwo, basedamage: basedamagetwo, baserecovery: baserecoverytwo, baseparry: baseparrytwo, basemeasure: basemeasuretwo, type: typetwo, bonus: bonustwo, traits: traitstwo, size: sizetwo } = weapontwo
            promiseArray.push(query(combatInserts.weapontwo, [weaponidtwo, id, trainattacktwo, trainparrytwo, trainrecoverytwo, traindamagetwo, miscattacktwo, miscparrytwo, miscrecoverytwo, miscdamagetwo, miscinittwo, nametwo, basedamagetwo, baserecoverytwo, baseparrytwo, basemeasuretwo, typetwo, bonustwo, traitstwo, sizetwo]).catch(e => sendErrorForward('weapon two', e, res)))

            let { weaponid: weaponidthree, trainattack: trainattackthree, trainparry: trainparrythree, trainrecovery: trainrecoverythree, traindamage: traindamagethree, miscattack: miscattackthree, miscparry: miscparrythree, miscrecovery: miscrecoverythree, miscdamage: miscdamagethree, miscinit: miscinitthree, name: namethree, basedamage: basedamagethree, baserecovery: baserecoverythree, baseparry: baseparrythree, basemeasure: basemeasurethree, type: typethree, bonus: bonusthree, traits: traitsthree, size: sizethree } = weaponthree
            promiseArray.push(query(combatInserts.weaponthree, [weaponidthree, id, trainattackthree, trainparrythree, trainrecoverythree, traindamagethree, miscattackthree, miscparrythree, miscrecoverythree, miscdamagethree, miscinitthree, namethree, basedamagethree, baserecoverythree, baseparrythree, basemeasurethree, typethree, bonusthree, traitsthree, sizethree]).catch(e => sendErrorForward('weapon three', e, res)))

            let { weaponid: weaponidfour, trainattack: trainattackfour, trainrecovery: trainrecoveryfour, traindamage: traindamagefour, miscattack: miscattackfour, miscrecovery: miscrecoveryfour, miscdamage: miscdamagefour, miscinit: miscinitfour, name: namefour, basedamage: basedamagefour, baserecovery: baserecoveryfour, type: typefour, bonus: bonusfour, traits: traitsfour, size: sizefour } = weaponfour
            promiseArray.push(query(combatInserts.weaponfour, [weaponidfour, id, trainattackfour, trainrecoveryfour, traindamagefour, miscattackfour, miscrecoveryfour, miscdamagefour, miscinitfour, namefour, basedamagefour, baserecoveryfour, typefour, bonusfour, traitsfour, sizefour]).catch(e => sendErrorForward('weapon four', e, res)))

            promiseArray.push(query(combatInserts.armor, [armorid, id, armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainfatigue, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscfatigue, armorbasedef, armorbaserecovery, armorbasefatiguemod, armorbaseinit]).catch(e => sendErrorForward('armor', e, res)))
            promiseArray.push(query(combatInserts.shield, [shieldid, id, shieldname, shielddr, shieldsize, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldbasefatigue, shieldbasebreak, shieldtraindef, shieldtrainparry ? +shieldtrainparry : 0, shieldtrainfatigue, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscfatigue, shieldflanks]).catch(e => sendErrorForward('shield', e, res)))

            let { nativeid, language, rank: languagerank } = nativelanguage
            promiseArray.push(query(skillInserts.nativeLanguage, [nativeid, id, language, languagerank]).catch(e => sendErrorForward('native language', e, res)))

            skillsuites.forEach(({ skillsuiteid, rank, characterskillsuitesid, trained }) => {
                if (characterskillsuitesid) {
                    promiseArray.push(query(skillUpdates.skillsuites, [rank, characterskillsuitesid, trained]).catch(e => sendErrorForward('skill suites update', e, res)))
                } else if (!characterskillsuitesid) {
                    promiseArray.push(query(skillInserts.skillsuites, [skillsuiteid, id, rank, trained]).catch(e => sendErrorForward('skill suites add', e, res)))
                }
            })

            promiseArray.push(query(skillDeletes.skills, [id, [0, ...skills.map(skills => skills.id)]]).then(_ => {
                return skills.map(({ id: skillsid, cost, skill, rank, mod }) => {
                    return query(skillInserts.skills, [skillsid, id, skill, cost, rank, mod]).catch(e => sendErrorForward('skills update', e, res))
                })
            }).catch(e => sendErrorForward('skills delete', e, res)))

            combatskillsuites.forEach(({ skillsuiteid, rank, characterskillsuitesid, trained }) => {
                if (characterskillsuitesid) {
                    promiseArray.push(query(combatUpdates.skillsuitescombat, [rank, characterskillsuitesid, trained]).catch(e => sendErrorForward('combat skill suites update', e, res)))
                } else if (!characterskillsuitesid) {
                    promiseArray.push(query(combatInserts.skillsuitescombat, [skillsuiteid, id, rank, trained]).catch(e => sendErrorForward('combat skill suites add', e, res)))
                }
            })

            promiseArray.push(query(combatDeletes.skillscombat, [id, [0, ...combatskills.map(skills => skills.id)]]).then(_ => {
                return combatskills.map(({ id: skillsid, cost, skill, rank, mod }) => {
                    return query(combatInserts.skillscombat, [skillsid, id, skill, cost, rank, mod]).catch(e => sendErrorForward('combat skills update', e, res))
                })
            }).catch(e => sendErrorForward('combat skills delete', e, res)))

            Promise.all(promiseArray).then(_ => {
                assembleCharacter(req).then((character) => {
                    checkForContentTypeBeforeSending(res, character)
                })
            }).catch(e => sendErrorForward('main final promise', e.message, res))
        }).catch(e => sendErrorForward('main update', e, res))
    }
}

module.exports = editController