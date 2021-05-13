INSERT INTO weaponthree (characterid, trainattack, trainparry, trainrecovery, traindamage, miscattack, miscparry, miscrecovery, miscdamage, miscinit, name, basedamage, baserecovery, baseparry, basemeasure, type, bonus, traits, size)
VALUES($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) 
ON CONFLICT (characterid)
DO 
   UPDATE SET 
    characterid = $2, trainattack = $3, trainparry = $4, trainrecovery = $5, traindamage = $6, miscattack = $7, miscparry = $8, miscrecovery = $9, miscdamage = $10, miscinit = $11, name = $12, basedamage = $13, baserecovery = $14, baseparry = $15, basemeasure = $16, type = $17, bonus = $18, traits = $19, size = $20