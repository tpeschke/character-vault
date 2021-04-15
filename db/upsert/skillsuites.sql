INSERT INTO cvcharacterskillsuites (characterid, skillsuiteid, rank)
VALUES($2, $3, $4) 
ON CONFLICT (characterskillsuitesid)
DO 
   UPDATE SET characterid = $2, skillsuiteid = $3, rank = $4