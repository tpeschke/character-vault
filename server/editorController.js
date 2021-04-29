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
module.exports = { 
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
        db.update.removeCharacter(req.params.characterid).then(data => {
            res.send({message: 'character removed'})
        })
    },
    updateSingleThing: (req, res) => {
        const db = req.app.get('db')
        let { body } = req
        , { characterid } = req.params
        , keyName = Object.keys( body )[0]
        , table = 'cvcharactermain'
        , idname = 'id'

        if (keyName.includes('misc')) {
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
        db.query(`update ${table} set ${keyName} = $1 where ${idname} = $2`, [body[keyName], characterid]).then(result => {
            res.send({messsage: "updated"})
        })
    },
    updateOrAddCharacter: (req, res) => {
        const db = req.app.get('db')
        let {id, userid, name, race, primarya, secondarya, primarylevel, secondarylevel, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitality, vitalitydice, vitalityroll, wis, int, level, temperament, goals, devotions, flaws, traits, reputation, contacts, abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, crawl, walk, jog,
            run, sprint, oneweaponid, onetrainattack, onetrainparry, onetrainrecovery, onetraindamage, onemiscattack, onemiscparry, onemiscrecovery, onemiscdamage, onemiscinit, onename, onebasedamage, onebaserecovery, onebaseparry, onebasemeasure, onetype, onebonus, onetraits, onesize, twoweaponid, twotrainattack, twotrainparry, twotrainrecovery, twotraindamage, twomiscattack, twomiscparry, twomiscrecovery, twomiscdamage, twomiscinit, twoname, twobasedamage, 
            twobaserecovery, twobaseparry, twobasemeasure, twotype, twobonus, twotraits, twosize, threeweaponid, threetrainattack, threetrainparry, threetrainrecovery, threetraindamage, threemiscattack, threemiscparry, threemiscrecovery, threemiscdamage, threemiscinit, threename, threebasedamage, threebaserecovery, threebaseparry, threebasemeasure, threetype, threebonus, threetraits, threesize, fourweaponid, fourtrainattack, fourtrainrecovery, fourtraindamage, fourmiscattack, 
            fourmiscrecovery, fourmiscdamage, fourmiscinit, fourname, fourbasedamage, fourbaserecovery, fourtype, fourbonus, fourtraits, foursize, armorid, armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainencumb, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscencumb, armorbasedef, armorbaserecovery, armorbaseencumb, armorbaseinit, shieldname, shielddr, shieldsize, shieldcover, shieldbonus, shieldbasedef, 
            shieldbaseparry, shieldbaseencumb, shieldbasebreak, shieldtraindef, shieldtrainparry, shieldtrainencumb, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscencumb, shieldid, skillsuites, skillone, skilltwo, skillthree, nativelanguage } = req.body
            
        primarylevel = setToMin(primarylevel, 1)
        secondarylevel = setToMin(secondarylevel, 1)
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

        db.upsert.character(id, userid, name, race, primarya, secondarya, primarylevel, secondarylevel, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, +vitality, vitalitydice, vitalityroll, wis, int, level, temperament, contacts, abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, crawl, walk, jog, run, sprint).then((data)=>{
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
            promiseArray.push(db.upsert.weaponone(oneweaponid, id, onetrainattack, onetrainparry, onetrainrecovery, onetraindamage, onemiscattack, onemiscparry, setToMin(onemiscrecovery, 0), onemiscdamage, onemiscinit, onename, onebasedamage, onebaserecovery, onebaseparry, onebasemeasure, onetype, onebonus, onetraits, onesize))
            promiseArray.push(db.upsert.weapontwo(twoweaponid, id, twotrainattack, twotrainparry, twotrainrecovery, twotraindamage, twomiscattack, twomiscparry, setToMin(twomiscrecovery, 0), twomiscdamage, twomiscinit, twoname, twobasedamage, twobaserecovery, twobaseparry, twobasemeasure, twotype, twobonus, twotraits, twosize))
            promiseArray.push(db.upsert.weaponthree(threeweaponid, id, threetrainattack, threetrainparry, threetrainrecovery, threetraindamage, threemiscattack, setToMin(threemiscparry, 0), threemiscrecovery, threemiscdamage, threemiscinit, threename, threebasedamage, threebaserecovery, threebaseparry, threebasemeasure, threetype, threebonus, threetraits, threesize))
            promiseArray.push(db.upsert.weaponfour(fourweaponid, id, fourtrainattack, fourtrainrecovery, fourtraindamage, fourmiscattack, setToMin(fourmiscrecovery, 0), fourmiscdamage, fourmiscinit, fourname, fourbasedamage, fourbaserecovery, fourtype, fourbonus, fourtraits, foursize))

            promiseArray.push(db.upsert.armor(armorid, id, armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainencumb, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscencumb, armorbasedef, armorbaserecovery, armorbaseencumb, armorbaseinit))
            promiseArray.push(db.upsert.shield(shieldid, id, shieldname, shielddr, shieldsize, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldbaseencumb, shieldbasebreak, shieldtraindef, shieldtrainparry, shieldtrainencumb, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscencumb))

            let {nativeid, language, rank: languagerank } = nativelanguage
            promiseArray.push(db.upsert.nativeLanguage(nativeid, id, language, languagerank))

            skillsuites.forEach(({ skillsuiteid, rank, characterskillsuitesid }) => {
                if (characterskillsuitesid && rank) {
                    promiseArray.push(db.upsert.insert.skillsuites(rank, characterskillsuitesid))
                } else if (!characterskillsuitesid && rank) {
                    promiseArray.push(db.upsert.add.skillsuites(skillsuiteid, id, rank))
                }
            })
            promiseArray.push(db.delete.skillone([id, [0, ...skillone.map(skillone=>skillone.id)]]).then(_=> {
                return skillone.map(({id: skilloneid, cost, skill, rank}) => {
                    return db.upsert.skillone(skilloneid, id, skill, cost, rank)
                })
            }))
            promiseArray.push(db.delete.skilltwo([id, [0, ...skilltwo.map(skilltwo=>skilltwo.id)]]).then(_=> {
                return skilltwo.map(({id: skilltwoid, cost, skill, rank}) => {
                    return db.upsert.skilltwo(skilltwoid, id, skill, cost, rank)
                })
            }))
            promiseArray.push(db.delete.skillthree([id, [0, ...skillthree.map(skillthree=>skillthree.id)]]).then(_=> {
                return skillthree.map(({id: skillthreeid, cost, skill, rank}) => {
                    return db.upsert.skillthree(skillthreeid, id, skill, cost, rank)
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