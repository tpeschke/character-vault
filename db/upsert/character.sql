INSERT INTO cvcharactermain (id, userid, name, race, primaryA, secondarya, primarylevel, secondarylevel, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitality, vitalitydice, vitalityroll, wis, int, level)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) 
ON CONFLICT (id)
DO 
   UPDATE SET name = $3, race =$4, primaryA = $5, secondaryA = $6, primarylevel = $7, secondarylevel = $8, cha = $9, con = $10, crp = $11, dex = $12, drawback = $13, excurrent = $14, favormax = $15, honor = $16, sizemod = $17, str = $18, stressthreshold = $19, vitality = $20, vitalitydice = $21, vitalityroll = $22, wis = $23, int = $24, level = $25;