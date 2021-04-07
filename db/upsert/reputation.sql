INSERT INTO cvreputation (characterid, value)
VALUES($2, $3) 
ON CONFLICT (id)
DO 
   UPDATE SET characterid = $2, value = $3