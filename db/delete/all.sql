delete from damageone where characterid = $1;
delete from damagetwo where characterid = $1;

delete from cvgoals where characterid = $1;
delete from cvdevotions where characterid = $1;
delete from cvflaws where characterid = $1;
delete from cvtraits where characterid = $1;
delete from cvreputation where characterid = $1;

delete from cvgearone where characterid = $1;
delete from cvgeartwo where characterid = $1;
delete from cvgearthree where characterid = $1;
delete from cvgearfour where characterid = $1;

delete from weaponone where characterid = $1;
delete from weapontwo where characterid = $1;
delete from weaponthree where characterid = $1;
delete from weaponfour where characterid = $1;

delete from cvarmor where characterid = $1;
delete from cvshield where characterid = $1;

delete from cvcharacterskillsuites where characterid = $1;
delete from cvcharactercombatskillsuites where characterid = $1;
delete from cvskillone where characterid = $1;
delete from cvskilltwo where characterid = $1;
delete from cvskillthree where characterid = $1;
delete from cvnativelanguage where characterid = $1;
delete from cvskills where characterid = $1;
delete from cvcombatskills where characterid = $1;

delete from cvcharactermain where id = $1;