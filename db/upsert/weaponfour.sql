INSERT INTO weaponfour (characterid, trainattack, trainrecovery, traindamage, miscattack, miscrecovery, miscdamage, miscinit, name, basedamage, baserecovery, type, bonus, traits, size)
VALUES($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) 
ON CONFLICT (characterid)
DO 
   UPDATE SET 
    characterid = $2, trainattack = $3, trainrecovery = $4, traindamage = $5, miscattack = $6, miscrecovery = $7, miscdamage = $8, miscinit = $9, name = $10, basedamage = $11, baserecovery = $12, type = $13, bonus = $14, traits = $15, size = $16