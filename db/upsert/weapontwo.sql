INSERT INTO weapontwo (characterid, twotrainattack, twotrainparry, twotrainrecovery, twotraindamage, twomiscattack, twomiscparry, twomiscrecovery, twomiscdamage, twomiscinit, twoname, twobasedamage, twobaserecovery, twobaseparry, twobasemeasure, twotype, twobonus, twotraits, twosize)
VALUES($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) 
ON CONFLICT (characterid)
DO 
   UPDATE SET 
    characterid = $2, twotrainattack = $3, twotrainparry = $4, twotrainrecovery = $5, twotraindamage = $6, twomiscattack = $7, twomiscparry = $8, twomiscrecovery = $9, twomiscdamage = $10, twomiscinit = $11, twoname = $12, twobasedamage = $13, twobaserecovery = $14, twobaseparry = $15, twobasemeasure = $16, twotype = $17, twobonus = $18, twotraits = $19, twosize = $20