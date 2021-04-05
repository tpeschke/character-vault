INSERT INTO cvcharactermain (id, userid, name, race, primaryA, secondarya, level)
VALUES($1, $2, $3, $4, $5, $6, $7) 
ON CONFLICT (id)
DO 
   UPDATE SET name = $3, race =$4, primaryA = $5, secondaryA = $6, level = $7;