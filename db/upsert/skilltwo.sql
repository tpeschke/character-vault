INSERT INTO cvskilltwo (characterid, skill, cost, rank)
VALUES($2, $3, $4, $5) 
ON CONFLICT (id)
DO 
   UPDATE SET characterid = $2, skill = $3, cost = $4, rank = $5