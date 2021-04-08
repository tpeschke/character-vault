INSERT INTO cvgearthree (characterid, title, value)
VALUES($2, $3, $4) 
ON CONFLICT (id)
DO 
   UPDATE SET characterid = $2, title = $3, value = $4