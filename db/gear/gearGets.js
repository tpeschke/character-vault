module.exports = {
    gearfour: "select id, characterid, title, value from cvgearfour where characterid = $1",
    gearone: "select id, characterid, title, value from cvgearone where characterid = $1",
    gearthree: "select id, characterid, title, value from cvgearthree where characterid = $1",
    geartwo: "select id, characterid, title, value from cvgeartwo where characterid = $1"
}