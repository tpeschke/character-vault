const { assembleCharacter } = require('./viewController')

function setToMinAndMax (value = 0, min, max) {
    return setToMax(setToMin(value, min), max)
}

function setToMin (value = 0, min) {
    return +value >= min ? +value : min
}

function setToMax (value = 0, max) {
    return +value <= max ? +value : max
}
editController = { 
    addCharacter: (req, res) => {
        const db = req.app.get('db')
        db.upsert.add.character(req.user.id).then(data => {
            req.params.id = data[0].id
            assembleCharacter(req).then((character) => {
                res.send(data[0])
            })
        })
    },
    removeCharacter: (req, res) => {
        const db = req.app.get('db')
        editController.checkToSeeIfDeleteWorthy(req).then(shouldDelete => {
            if (shouldDelete) {
                db.delete.all(req.params.characterid).then(_ => {
                    res.send({message: 'character removed'})
                })
            } else {
                db.update.removeCharacter(req.params.characterid).then(data => {
                    res.send({message: 'character removed'})
                })
            }
        })
    },
    checkToSeeIfDeleteWorthy: async (req) => {
        const db = req.app.get('db')
        let { characterid } = req.params
        return db.get.character(characterid).then(character => {
            let {race, primarya, secondarya, level, honor, str, con, dex, int, wis, cha, temperament, abilitiesone, abilitiestwo, abilitiesthree, userid} = character[0]
            let abilities = (!!abilitiesone || !!abilitiestwo || !!abilitiesthree)
            if ((race && primarya && secondarya && level && honor && str && con && dex && int && wis && cha && temperament && abilities) || !userid) {
                let promiseArray = []
                , gearArray = []
                , otherArray = []
                promiseArray.push(db.get.devotions(characterid).then(result => otherArray.push(result)))
                promiseArray.push(db.get.flaws(characterid).then(result => otherArray.push(result)))
                promiseArray.push(db.get.traits(characterid).then(result => otherArray.push(result)))
                promiseArray.push(db.get.gearone(characterid).then(result => gearArray = [...gearArray, ...result]))
                promiseArray.push(db.get.geartwo(characterid).then(result => gearArray = [...gearArray, ...result]))
                promiseArray.push(db.get.gearthree(characterid).then(result => gearArray = [...gearArray, ...result]))
                promiseArray.push(db.get.gearfour(characterid).then(result => gearArray = [...gearArray, ...result]))
                
                return Promise.all(promiseArray).then(_=> {
                    for(let i = 0; i< otherArray.length; i++) {
                        if (otherArray[i].length === 0) {
                            return true
                        }
                    }
                    return gearArray.length < 0
                })
            } else {
                return true
            }
        })
    },
    updateSingleThing: (req, res) => {
        const db = req.app.get('db')
        let { body } = req
        , { characterid } = req.params
        , keyName = Object.keys( body )[0]
        , table = 'cvcharactermain'
        , idname = 'id'

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
            } else if (keyName.includes('four')) {
                table = 'weaponfour'
            }
            idname = 'characterid'
        }
        
        if (body[keyName].length || body[keyName].length === 0) {
            let promiseArray = []
            promiseArray.push(db.delete[keyName]([characterid, [0, ...body[keyName].map(table=>table.id)]]).then(_=> {
                return body[keyName].map(({id, value, title}) => {
                    return db.upsert[keyName](id, characterid, title, value)
                })
            }))

            Promise.all(promiseArray).then(_=> {
                res.send({messsage: "updated"})
            })
        } else {
            db.query(`update ${table} set ${keyName} = $1 where ${idname} = $2`, [body[keyName], characterid]).then(result => {
                res.send({messsage: "updated"})
            })
        }

    },
    updateOrAddCharacter: (req, res) => {
        const db = req.app.get('db')
        let {id, userid, name, race, primarya, secondarya, primarylevel, secondarylevel, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitality, vitalitydice, vitalityroll, wis, int, level, temperament, goals, devotions, flaws, traits, reputation, contacts, abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, crawl, walk, jog,
            run, sprint, weaponone, weapontwo, weaponthree, weaponfour, armorid, armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainencumb, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscencumb, armorbasedef, armorbaserecovery, armorbaseencumb, armorbaseinit, shieldname, shielddr, shieldsize, shieldcover, shieldbonus, shieldbasedef, 
            shieldbaseparry, shieldbaseencumb, shieldbasebreak, shieldtraindef, shieldtrainparry, shieldtrainencumb, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscencumb, shieldid, skillsuites, skills, nativelanguage, skilladept } = req.body
            skilladept = setToMin(skilladept, 0)
        level = setToMin(level, 1)
        crp = setToMin(crp, 0)
        copper = setToMin(copper, 0)
        silver = setToMin(silver, 0)
        gold = setToMin(gold, 0)
        platinium = setToMin(platinium, 0)
        excurrent = setToMin(excurrent, 0)
        str = setToMinAndMax(str, 1, 20)
        dex = setToMinAndMax(dex, 1, 20)
        con = setToMinAndMax(con, 1, 20)
        int = setToMinAndMax(int, 1, 20)
        wis = setToMinAndMax(wis, 1, 20)
        cha = setToMinAndMax(cha, 1, 20)
        honor = setToMinAndMax(honor, 0, 25)
        stressthreshold = setToMin(stressthreshold, 0)
        sizemod = setToMin(sizemod, 0)
        vitalityroll = setToMin(vitalityroll, 0)

        db.upsert.character(id, userid, name, race, primarya, secondarya, +primarylevel, +secondarylevel, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, +vitality, vitalitydice, vitalityroll, wis, int, level, temperament, contacts, abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, crawl, walk, jog, run, sprint, skilladept).then((data)=>{
            req.params.id = id
            let promiseArray = []
            promiseArray.push(db.delete.goals([id, [0, ...goals.map(goals=>goals.id)]]).then(_=> {
                return goals.map(({id: goalid, value}) => {
                    return db.upsert.goals(goalid, id, value)
                })
            }))
            promiseArray.push(db.delete.devotions([id, [0, ...devotions.map(devotions=>devotions.id)]]).then(_=> {
                return devotions.map(({id: devotionid, value, title}) => {
                    return db.upsert.devotions(devotionid, id, title, setToMin(value, 0))
                })
            }))
            promiseArray.push(db.delete.flaws([id, [0, ...flaws.map(flaws=>flaws.id)]]).then(_=> {
                return flaws.map(({id: flawid, value, title}) => {
                    return db.upsert.flaws(flawid, id, title, value)
                })
            }))
            promiseArray.push(db.delete.traits([id, [0, ...traits.map(traits=>traits.id)]]).then(_=> {
                return traits.map(({id: traitsid, value, title}) => {
                    return db.upsert.traits(traitsid, id, title, value)
                })
            }))
            promiseArray.push(db.delete.reputation([id, [0, ...reputation.map(reputation=>reputation.id)]]).then(_=> {
                return reputation.map(({id: reputationid, value}) => {
                    return db.upsert.reputation(reputationid, id, value)
                })
            }))
            promiseArray.push(db.delete.gearone([id, [0, ...gearone.map(gearone=>gearone.id)]]).then(_=> {
                return gearone.map(({id: gearoneid, value, title}) => {
                    return db.upsert.gearone(gearoneid, id, title, value)
                })
            }))
            promiseArray.push(db.delete.geartwo([id, [0, ...geartwo.map(geartwo=>geartwo.id)]]).then(_=> {
                return geartwo.map(({id: geartwoid, value, title}) => {
                    return db.upsert.geartwo(geartwoid, id, title, value)
                })
            }))
            promiseArray.push(db.delete.gearthree([id, [0, ...gearthree.map(gearthree=>gearthree.id)]]).then(_=> {
                return gearthree.map(({id: gearthreeid, value, title}) => {
                    return db.upsert.gearthree(gearthreeid, id, title, value)
                })
            }))
            promiseArray.push(db.delete.gearfour([id, [0, ...gearfour.map(gearfour=>gearfour.id)]]).then(_=> {
                return gearfour.map(({id: gearfourid, value, title}) => {
                    return db.upsert.gearfour(gearfourid, id, title, value)
                })
            }))
            let {weaponid, trainattack, trainparry, trainrecovery, traindamage, miscattack, miscparry, miscrecovery, miscdamage, miscinit, name, basedamage, baserecovery, baseparry, basemeasure, type, bonus, traits, size} = weaponone
            promiseArray.push(db.upsert.weaponone(weaponid, id, trainattack, trainparry, trainrecovery, traindamage, miscattack, miscparry, setToMin(miscrecovery, 0), miscdamage, miscinit, name, basedamage, baserecovery, baseparry, basemeasure, type, bonus, traits, size))

            let {weaponid: weaponidtwo, trainattack: trainattacktwo, trainparry: trainparrytwo, trainrecovery: trainrecoverytwo, traindamage: traindamagetwo, miscattack: miscattacktwo, miscparry: miscparrytwo, miscrecovery: miscrecoverytwo, miscdamage: miscdamagetwo, miscinit: miscinittwo, name: nametwo, basedamage: basedamagetwo, baserecovery: baserecoverytwo, baseparry: baseparrytwo, basemeasure: basemeasuretwo, type: typetwo, bonus: bonustwo, traits: traitstwo, size: sizetwo} = weapontwo
            promiseArray.push(db.upsert.weapontwo(weaponidtwo, id, trainattacktwo, trainparrytwo, trainrecoverytwo, traindamagetwo, miscattacktwo, miscparrytwo, setToMin(miscrecoverytwo, 0), miscdamagetwo, miscinittwo, nametwo, basedamagetwo, baserecoverytwo, baseparrytwo, basemeasuretwo, typetwo, bonustwo, traitstwo, sizetwo))

            let {weaponid: weaponidthree, trainattack: trainattackthree, trainparry: trainparrythree, trainrecovery: trainrecoverythree, traindamage: traindamagethree, miscattack: miscattackthree, miscparry: miscparrythree, miscrecovery: miscrecoverythree, miscdamage: miscdamagethree, miscinit: miscinitthree, name: namethree, basedamage: basedamagethree, baserecovery: baserecoverythree, baseparry: baseparrythree, basemeasure: basemeasurethree, type: typethree, bonus: bonusthree, traits: traitsthree, size: sizethree} = weaponthree
            promiseArray.push(db.upsert.weaponthree(weaponidthree, id, trainattackthree, trainparrythree, trainrecoverythree, traindamagethree, miscattackthree, miscparrythree, setToMin(miscrecoverythree, 0), miscdamagethree, miscinitthree, namethree, basedamagethree, baserecoverythree, baseparrythree, basemeasurethree, typethree, bonusthree, traitsthree, sizethree))

            let {weaponid: weaponidfour, trainattack: trainattackfour, trainrecovery: trainrecoveryfour, traindamage: traindamagefour, miscattack: miscattackfour, miscrecovery: miscrecoveryfour, miscdamage: miscdamagefour, miscinit: miscinitfour, name: namefour, basedamage: basedamagefour, baserecovery: baserecoveryfour, type: typefour, bonus: bonusfour, traits: traitsfour, size: sizefour} = weaponfour
            promiseArray.push(db.upsert.weaponfour(weaponidfour, id, trainattackfour, trainrecoveryfour, traindamagefour, miscattackfour, setToMin(miscrecoveryfour, 0), miscdamagefour, miscinitfour, namefour, basedamagefour, baserecoveryfour, typefour, bonusfour, traitsfour, sizefour))

            promiseArray.push(db.upsert.armor(armorid, id, armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainencumb, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscencumb, armorbasedef, armorbaserecovery, armorbaseencumb, armorbaseinit))
            promiseArray.push(db.upsert.shield(shieldid, id, shieldname, shielddr, shieldsize, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldbaseencumb, shieldbasebreak, shieldtraindef, shieldtrainparry, shieldtrainencumb, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscencumb))

            let {nativeid, language, rank: languagerank } = nativelanguage
            promiseArray.push(db.upsert.nativeLanguage(nativeid, id, language, languagerank))

            skillsuites.forEach(({ skillsuiteid, rank, characterskillsuitesid }) => {
                if (characterskillsuitesid) {
                    promiseArray.push(db.upsert.insert.skillsuites(rank, characterskillsuitesid))
                } else if (!characterskillsuitesid) {
                    promiseArray.push(db.upsert.add.skillsuites(skillsuiteid, id, rank))
                }
            })
            promiseArray.push(db.delete.skills([id, [0, ...skills.map(skills=>skills.id)]]).then(_=> {
                return skills.map(({id: skillsid, cost, skill, rank}) => {
                    return db.upsert.skills(skillsid, id, skill, cost, rank)
                })
            }))

            Promise.all(promiseArray).then(_=> {
                assembleCharacter(req).then((character) => {
                    res.send(character)
                })
            })
        })
    }
}

module.exports = editController