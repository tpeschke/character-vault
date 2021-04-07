const { assembleCharacter } = require('./viewController')

function setToMin (value, min) {
    return value >= min ? value : min
}

function setToMax (value, max) {
    return value <= max ? value : max
}
module.exports = { 
    updateOrAddCharacter: (req, res) => {
        const db = req.app.get('db')
        let {id, userid, name, race, primarya, secondarya, primarylevel, secondarylevel, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitality, vitalitydice, vitalityroll, wis, int, level, temperament, goals} = req.body
        primarylevel = setToMin(primarylevel, 1)
        secondarylevel = setToMin(secondarylevel, 1)
        level = setToMin(level, 1)
        crp = setToMin(crp, 0)
        excurrent = setToMin(excurrent, 0)
        str = setToMin(str, 1)
        dex = setToMin(dex, 1)
        con = setToMin(con, 1)
        int = setToMin(int, 1)
        wis = setToMin(wis, 1)
        cha = setToMin(cha, 1)
        honor = setToMin(honor, 0)
        stressthreshold = setToMin(stressthreshold, 0)
        sizemod = setToMin(sizemod, 0)
        vitalityroll = setToMin(vitalityroll, 0)

        str = setToMax(str, 20)
        dex = setToMax(dex, 20)
        con = setToMax(con, 20)
        int = setToMax(int, 20)
        wis = setToMax(wis, 20)
        cha = setToMax(cha, 20)
        honor = setToMax(honor, 25)

        db.upsert.character(id, userid, name, race, primarya, secondarya, primarylevel, secondarylevel, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, +vitality, vitalitydice, vitalityroll, wis, int, level, temperament).then((data)=>{
            let { id } = data[0]
            req.params.id = id
            let promiseArray = []
            promiseArray.push(goals.map(({id: goalid, value}) => {
                return db.upsert.goals(goalid, id, value).then(_=> {
                    
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