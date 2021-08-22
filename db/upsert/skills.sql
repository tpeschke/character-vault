INSERT INTO cvskills (characterid, skill, cost, rank, mod)
VALUES($2, $3, $4, $5, $6) 
ON CONFLICT (id)
DO 
   UPDATE SET characterid = $2, skill = $3, cost = $4, rank = $5, mod = $6