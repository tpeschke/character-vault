module.exports = {
    armor: "select * from cvarmor where characterid = $1",
    characterForCombat: "SELECT id, name, vitalityroll, sizemod, vitality, con from cvcharactermain c where id = $1",
    damageone: "select * from damageone where characterid = $1",
    damagetwo: "select * from damagetwo where characterid = $1",
    shield: "select * from cvshield where characterid = $1",
    skillscombat: "select * from cvcombatskills where characterid = $1 order by skill",
    skillsuitescombat: "select combatskillsuiteid as skillsuiteid, * from cvcharactercombatskillsuites where characterid = $1 order by combatskillsuiteid",
    weaponfour: "select * from weaponfour where characterid = $1",
    weaponone: "select * from weaponone where characterid = $1",
    weaponsForCombat: "(SELECT weaponid, name, baserecovery, miscrecovery, trainrecovery from weaponone where characterid = $1) union (select weaponid, name, baserecovery, miscrecovery, trainrecovery from weapontwo where characterid = $1) union (select weaponid, name, baserecovery, miscrecovery, trainrecovery from weaponthree where characterid = $1) union (select weaponid, name, baserecovery, miscrecovery, trainrecovery from weaponfour where characterid = $1)",
    weaponthree: "select * from weaponthree where characterid = $1",
    weapontwo: "select * from weapontwo where characterid = $1"
}