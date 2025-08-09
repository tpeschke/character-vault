module.exports = {
    descriptions: "delete from cvdescriptions where characterid = $1 and id != ANY($2)",
    devotions: "delete from cvdevotions where characterid = $1 and id != ANY($2)",
    flaws: "delete from cvflaws where characterid = $1 and id != ANY($2)",
    deletes: "delete from cvgoals where characterid = $1 and id != ANY($2)",
    reputation: "delete from cvreputation where characterid = $1 and id != ANY($2)",
    traits: "delete from cvtraits where characterid = $1 and id != ANY($2)"
}