INSERT INTO cvcharactermain (id, userid, name, race, primaryA, secondarya, level, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitality, vitalitydice, vitalityroll, wis, int)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) 
ON CONFLICT (id)
DO 
   UPDATE SET name = $3, race =$4, primaryA = $5, secondaryA = $6, level = $7, cha = $8, con = $9, crp = $10, dex = $11, drawback = $12, excurrent = $13, favormax = $14, honor = $15, sizemod = $16, str = $17, stressthreshold = $18, vitality = $19, vitalitydice = $20, vitalityroll = $21, wis = $22, int = $23;