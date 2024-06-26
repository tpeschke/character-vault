const { assembleCharacter } = require('./viewController')
const { sendErrorForwardNoFile, checkForContentTypeBeforeSending } = require('./helpers')
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
        const db = req.app.get('db')
        db.upsert.add.character(req.user.id).then(data => {
            req.params.id = data[0].id
            assembleCharacter(req).then((character) => {
                checkForContentTypeBeforeSending(res, data[0])
            }).catch(e => sendErrorForward('assembling character', e.message, res))
        }).catch(e => sendErrorForward('upsert character', e.message, res))
    },
    removeCharacter: (req, res) => {
        const db = req.app.get('db')
        editController.checkToSeeIfDeleteWorthy(req).then(shouldDelete => {
            // if (shouldDelete) {
            db.delete.all(req.params.characterid).then(_ => {
                checkForContentTypeBeforeSending(res, { message: 'character removed' })
            })
            // } else {
            //     db.update.removeCharacter(req.params.characterid).then(data => {
            //         checkForContentTypeBeforeSending(res, { message: 'character removed' })
            //     })
            // }
        }).catch(e => sendErrorForward('worth of delete', e.message, res))
    },
    checkToSeeIfDeleteWorthy: async (req) => {
        const db = req.app.get('db')
        let { characterid } = req.params
        return db.get.character(characterid).then(character => {
            let { race, primarya, secondarya, level, honor, str, con, dex, int, wis, cha, temperament, abilitiesone, abilitiestwo, abilitiesthree, userid } = character[0]
            let abilities = (!!abilitiesone || !!abilitiestwo || !!abilitiesthree)
            if ((race && primarya && secondarya && level && honor && str && con && dex && int && wis && cha && temperament && abilities) || !userid) {
                let promiseArray = []
                    , gearArray = []
                    , otherArray = []
                promiseArray.push(db.get.devotions(characterid).then(result => otherArray.push(result)))
                promiseArray.push(db.get.flaws(characterid).then(result => otherArray.push(result)))
                promiseArray.push(db.get.traits(characterid).then(result => otherArray.push(result)))
                promiseArray.push(db.get.descriptions(characterid).then(result => otherArray.push(result)))
                promiseArray.push(db.get.gearone(characterid).then(result => gearArray = [...gearArray, ...result]))
                promiseArray.push(db.get.geartwo(characterid).then(result => gearArray = [...gearArray, ...result]))
                promiseArray.push(db.get.gearthree(characterid).then(result => gearArray = [...gearArray, ...result]))
                promiseArray.push(db.get.gearfour(characterid).then(result => gearArray = [...gearArray, ...result]))

                return Promise.all(promiseArray).then(_ => {
                    for (let i = 0; i < otherArray.length; i++) {
                        if (otherArray[i].length === 0) {
                            return true
                        }
                    }
                    return gearArray.length < 0
                })
            } else {
                return true
            }
        }).catch(e => sendErrorForward('worth of delete inner', e.message, res))
    },
    updateSingleThing: (req, res) => {
        const db = req.app.get('db')
        let { body } = req
            , { characterid } = req.params
            , keyName = Object.keys(body)[0]
            , table = 'cvcharactermain'
            , idname = 'id'

        db.get.characterUserId(characterid).then(idresult => {
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
                    promiseArray.push(db.delete[keyName]([characterid, [0, ...body[keyName].map(table => table.id)]]).then(_ => {
                        return body[keyName].map(({ id, value, title }) => {
                            return db.upsert[keyName](id, characterid, title, value)
                        })
                    }).catch(e => sendErrorForward('update single thing array', e.message, res)))

                    Promise.all(promiseArray).then(_ => {
                        checkForContentTypeBeforeSending(res, { messsage: "updated" })
                    })
                } else {
                    db.query(`update ${table} set ${keyName} = $1 where ${idname} = $2`, [body[keyName], characterid]).then(result => {
                        checkForContentTypeBeforeSending(res, { messsage: "updated" })
                    }).catch(e => sendErrorForward('update single thing single', e.message, res))
                }
            } else {
                checkForContentTypeBeforeSending(res, { messsage: "not updated" })
            }
        }).catch(e => sendErrorForward('get user id single thing', e.message, res))
    },
    updateSingleThingOnObject: (req, res) => {
        const db = req.app.get('db')
        let { object, key, value } = req.body
            , { characterid } = req.params
        if (key === 'thrownweapon') {
            if (value === 1) {
                value = true
            } else {
                value = false
            }
        }
        db.get.characterUserId(characterid).then(idresult => {
            if (idresult[0].userid === req.user.id) {
                db.query(`update ${object} set ${key} = $1 where characterid = $2`, [value, characterid]).then(result => {
                    checkForContentTypeBeforeSending(res, { messsage: "updated" })
                }).catch(e => sendErrorForward('update single thing object', e.message, res))
            } else {
                checkForContentTypeBeforeSending(res, { messsage: "not updated" })
            }
        }).catch(e => sendErrorForward('get user id single thing on object', e.message, res))
    },
    updateOrAddCharacter: (req, res) => {
        const db = req.app.get('db')

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

        db.upsert.character(id, req.user.id, name, race, primarya, secondarya, +primarylevel, +secondarylevel, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, +vitality, vitalitydice, vitalityroll, wis, int, level, temperament, contacts, abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, crawl, walk, jog, run, sprint, skilladept, martialadept, secretgeneralnotes, temperamentrank, stressroll, stressdie, currentfavor, stresslockout, strength).then((data) => {
            req.params.id = id
            let promiseArray = []
            promiseArray.push(db.delete.goals([id, [0, ...goals.map(goals => goals.id)]]).then(_ => {
                return goals.map(({ id: goalid, value }) => {
                    return db.upsert.goals(goalid, id, value)
                })
            }).catch(e => sendErrorForward('goals', e, res)))
            promiseArray.push(db.delete.devotions([id, [0, ...devotions.map(devotions => devotions.id)]]).then(_ => {
                return devotions.map(({ id: devotionid, value, title }) => {
                    return db.upsert.devotions(devotionid, id, title, setToMin(value, 0))
                })
            }).catch(e => sendErrorForward('devotions', e, res)))
            promiseArray.push(db.delete.flaws([id, [0, ...flaws.map(flaws => flaws.id)]]).then(_ => {
                return flaws.map(({ id: flawid, value, title }) => {
                    return db.upsert.flaws(flawid, id, title, value)
                })
            }).catch(e => sendErrorForward('flaws', e, res)))
            promiseArray.push(db.delete.traits([id, [0, ...req.body.traits.map(traits => traits.id)]]).then(_ => {
                return req.body.traits.map(({ id: traitsid, value, title }) => {
                    return db.upsert.traits(traitsid, id, title, value)
                })
            }).catch(e => sendErrorForward('traits', e, res)))
            promiseArray.push(db.delete.descriptions([id, [0, ...req.body.descriptions.map(descriptions => descriptions.id)]]).then(_ => {
                return req.body.descriptions.map(({ id: descriptionsid, value, title }) => {
                    return db.upsert.descriptions(descriptionsid, id, title, value)
                })
            }).catch(e => sendErrorForward('descriptions', e, res)))
            promiseArray.push(db.delete.reputation([id, [0, ...reputation.map(reputation => reputation.id)]]).then(_ => {
                return reputation.map(({ id: reputationid, value }) => {
                    return db.upsert.reputation(reputationid, id, value)
                })
            }).catch(e => sendErrorForward('reputation', e, res)))
            promiseArray.push(db.delete.gearone([id, [0, ...gearone.map(gearone => gearone.id)]]).then(_ => {
                return gearone.map(({ id: gearoneid, value, title }) => {
                    return db.upsert.gearone(gearoneid, id, title, value)
                })
            }).catch(e => sendErrorForward('gear one', e, res)))
            promiseArray.push(db.delete.geartwo([id, [0, ...geartwo.map(geartwo => geartwo.id)]]).then(_ => {
                return geartwo.map(({ id: geartwoid, value, title }) => {
                    return db.upsert.geartwo(geartwoid, id, title, value)
                })
            }).catch(e => sendErrorForward('gear two', e, res)))
            promiseArray.push(db.delete.gearthree([id, [0, ...gearthree.map(gearthree => gearthree.id)]]).then(_ => {
                return gearthree.map(({ id: gearthreeid, value, title }) => {
                    return db.upsert.gearthree(gearthreeid, id, title, value)
                })
            }).catch(e => sendErrorForward('gear three', e, res)))
            promiseArray.push(db.delete.gearfour([id, [0, ...gearfour.map(gearfour => gearfour.id)]]).then(_ => {
                return gearfour.map(({ id: gearfourid, value, title }) => {
                    return db.upsert.gearfour(gearfourid, id, title, value)
                })
            }).catch(e => sendErrorForward('gear four', e, res)))
            let { weaponid, trainattack, trainparry, trainrecovery, traindamage, miscattack, miscparry, miscrecovery, miscdamage, miscinit, name, basedamage, baserecovery, baseparry, basemeasure, type, bonus, traits, size } = weaponone
            promiseArray.push(db.upsert.weaponone(weaponid, id, trainattack, trainparry, trainrecovery, traindamage, miscattack, miscparry, miscrecovery, miscdamage, miscinit, name, basedamage, baserecovery, baseparry, basemeasure, type, bonus, traits, size).catch(e => sendErrorForward('weapon one', e, res)))

            let { weaponid: weaponidtwo, trainattack: trainattacktwo, trainparry: trainparrytwo, trainrecovery: trainrecoverytwo, traindamage: traindamagetwo, miscattack: miscattacktwo, miscparry: miscparrytwo, miscrecovery: miscrecoverytwo, miscdamage: miscdamagetwo, miscinit: miscinittwo, name: nametwo, basedamage: basedamagetwo, baserecovery: baserecoverytwo, baseparry: baseparrytwo, basemeasure: basemeasuretwo, type: typetwo, bonus: bonustwo, traits: traitstwo, size: sizetwo } = weapontwo
            promiseArray.push(db.upsert.weapontwo(weaponidtwo, id, trainattacktwo, trainparrytwo, trainrecoverytwo, traindamagetwo, miscattacktwo, miscparrytwo, miscrecoverytwo, miscdamagetwo, miscinittwo, nametwo, basedamagetwo, baserecoverytwo, baseparrytwo, basemeasuretwo, typetwo, bonustwo, traitstwo, sizetwo).catch(e => sendErrorForward('weapon two', e, res)))

            let { weaponid: weaponidthree, trainattack: trainattackthree, trainparry: trainparrythree, trainrecovery: trainrecoverythree, traindamage: traindamagethree, miscattack: miscattackthree, miscparry: miscparrythree, miscrecovery: miscrecoverythree, miscdamage: miscdamagethree, miscinit: miscinitthree, name: namethree, basedamage: basedamagethree, baserecovery: baserecoverythree, baseparry: baseparrythree, basemeasure: basemeasurethree, type: typethree, bonus: bonusthree, traits: traitsthree, size: sizethree } = weaponthree
            promiseArray.push(db.upsert.weaponthree(weaponidthree, id, trainattackthree, trainparrythree, trainrecoverythree, traindamagethree, miscattackthree, miscparrythree, miscrecoverythree, miscdamagethree, miscinitthree, namethree, basedamagethree, baserecoverythree, baseparrythree, basemeasurethree, typethree, bonusthree, traitsthree, sizethree).catch(e => sendErrorForward('weapon three', e, res)))

            let { weaponid: weaponidfour, trainattack: trainattackfour, trainrecovery: trainrecoveryfour, traindamage: traindamagefour, miscattack: miscattackfour, miscrecovery: miscrecoveryfour, miscdamage: miscdamagefour, miscinit: miscinitfour, name: namefour, basedamage: basedamagefour, baserecovery: baserecoveryfour, type: typefour, bonus: bonusfour, traits: traitsfour, size: sizefour } = weaponfour
            promiseArray.push(db.upsert.weaponfour(weaponidfour, id, trainattackfour, trainrecoveryfour, traindamagefour, miscattackfour, miscrecoveryfour, miscdamagefour, miscinitfour, namefour, basedamagefour, baserecoveryfour, typefour, bonusfour, traitsfour, sizefour).catch(e => sendErrorForward('weapon four', e, res)))

            promiseArray.push(db.upsert.armor(armorid, id, armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainfatigue, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscfatigue, armorbasedef, armorbaserecovery, armorbasefatiguemod, armorbaseinit).catch(e => sendErrorForward('armor', e, res)))
            promiseArray.push(db.upsert.shield(shieldid, id, shieldname, shielddr, shieldsize, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldbasefatigue, shieldbasebreak, shieldtraindef, shieldtrainparry ? +shieldtrainparry : 0, shieldtrainfatigue, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscfatigue, shieldflanks).catch(e => sendErrorForward('shield', e, res)))

            let { nativeid, language, rank: languagerank } = nativelanguage
            promiseArray.push(db.upsert.nativeLanguage(nativeid, id, language, languagerank).catch(e => sendErrorForward('native language', e, res)))

            skillsuites.forEach(({ skillsuiteid, rank, characterskillsuitesid, trained }) => {
                if (characterskillsuitesid) {
                    promiseArray.push(db.upsert.insert.skillsuites(rank, characterskillsuitesid, trained).catch(e => sendErrorForward('skill suites update', e, res)))
                } else if (!characterskillsuitesid) {
                    promiseArray.push(db.upsert.add.skillsuites(skillsuiteid, id, rank, trained).catch(e => sendErrorForward('skill suites add', e, res)))
                }
            })
            promiseArray.push(db.delete.skills([id, [0, ...skills.map(skills => skills.id)]]).then(_ => {
                return skills.map(({ id: skillsid, cost, skill, rank, mod }) => {
                    return db.upsert.skills(skillsid, id, skill, cost, rank, mod).catch(e => sendErrorForward('skills update', e, res))
                })
            }).catch(e => sendErrorForward('skills delete', e, res)))

            combatskillsuites.forEach(({ skillsuiteid, rank, characterskillsuitesid, trained }) => {
                if (characterskillsuitesid) {
                    promiseArray.push(db.upsert.insert.skillsuitescombat(rank, characterskillsuitesid, trained).catch(e => sendErrorForward('combat skill suites update', e, res)))
                } else if (!characterskillsuitesid) {
                    promiseArray.push(db.upsert.add.skillsuitescombat(skillsuiteid, id, rank, trained).catch(e => sendErrorForward('combat skill suites add', e, res)))
                }
            })
            promiseArray.push(db.delete.skillscombat([id, [0, ...combatskills.map(skills => skills.id)]]).then(_ => {
                return combatskills.map(({ id: skillsid, cost, skill, rank, mod }) => {
                    return db.upsert.skillscombat(skillsid, id, skill, cost, rank, mod).catch(e => sendErrorForward('combat skills update', e, res))
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