select combatskillsuiteid as skillsuiteid, * from cvcharactercombatskillsuites
where characterid = $1
order by combatskillsuiteid