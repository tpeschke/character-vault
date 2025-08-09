module.exports = {
    descriptions: " select id, characterid, title, value from cvdescriptions where characterid = $1 order by NULLIF(regexp_replace(value, '\D', '', 'g'), '')::int desc",
    devotions: "select id, characterid, title, value from cvdevotions where characterid = $1",
    flaws: "select id, characterid, title, value from cvflaws where characterid = $1",
    goals: "select id, characterid, goal as value from cvgoals where characterid = $1",
    reputation: "select id, characterid,  value from cvreputation where characterid = $1",
    traits: "select id, characterid, title, value from cvtraits where characterid = $1 order by NULLIF(regexp_replace(value, '\D', '', 'g'), '')::int desc"
}