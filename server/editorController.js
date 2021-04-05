module.exports = { 
    updateOrAddCharacter: (req, res) => {
        const db = req.app.get('db')
        let {id, userid, name, race, primarya, secondarya, level} = req.body
        db.upsert.character(id, userid, name, race, primarya, secondarya, level).then(_=>{
            res.send('character updated or added')
        })
    }
}