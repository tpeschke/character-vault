module.exports = {
    damageone: "delete from damageone where characterid = $1 and id != ANY($2)",
    damagetwo: "delete from damagetwo where characterid = $1 and id != ANY($2)",
    skillcombat: "delete from cvcombatskills where characterid = $1 and id != ANY($2)"
}