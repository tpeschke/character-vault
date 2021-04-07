INSERT INTO cvgoals (characterid, goal)
VALUES($2, $3) 
ON CONFLICT (id)
DO 
   UPDATE SET characterid = $2, goal = $3