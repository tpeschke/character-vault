INSERT INTO cvnativelanguage (characterid, language, rank)
VALUES($2, $3, $4) 
ON CONFLICT (characterid)
DO 
   UPDATE SET characterid = $2, language = $3, rank =$4