module.exports = {
    gearfour: "delete from cvgearfour where characterid = $1 and id != ANY($2)",
    gearone: "delete from cvgearone where characterid = $1 and id != ANY($2)",
    gearthree: "delete from cvgearthree where characterid = $1 and id != ANY($2)",
    geartwo: "delete from cvgeartwo where characterid = $1 and id != ANY($2)"
}