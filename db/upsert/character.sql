INSERT INTO cvcharactermain (id, userid, name, race, primaryA, secondarya, primarylevel, secondarylevel, cha, con, crp, dex, drawback, 
excurrent, favormax, honor, sizemod, str, stressthreshold, vitality, vitalitydice, vitalityroll, wis, int, level, temperament, contacts,
abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, crawl, walk, jog,
run, sprint, skilladept, martialadept, secretgeneralnotes, temperamentrank, stressroll, stressdie, currentfavor, 
stresslockout, strength)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27,
$28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51) 
ON CONFLICT (id)
DO 
   UPDATE SET name = $3, race =$4, primaryA = $5, secondaryA = $6, primarylevel = $7, secondarylevel = $8, cha = $9, con = $10, 
   crp = $11, dex = $12, drawback = $13, excurrent = $14, 
   favormax = $15, honor = $16, sizemod = $17, str = $18, stressthreshold = $19, vitality = $20, 
   vitalitydice = $21, vitalityroll = $22, wis = $23, int = $24, level = $25, temperament = $26, 
   contacts = $27, abilitiesone = $28, abilitiestwo = $29, abilitiesthree = $30, removedability = $31,
   maxrange = $32, generalnotes = $33, copper = $34, silver = $35, gold = $36, platinium = $37,
   crawl = $38, walk = $39, jog = $40, run = $41, sprint = $42, skilladept = $43, martialadept = $44, secretgeneralnotes = $45,
   temperamentrank = $46, stressroll = $47, stressdie = $48, currentfavor = $49, stresslockout = $50,
   strength = $51
Returning id