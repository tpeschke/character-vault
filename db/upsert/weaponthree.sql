INSERT INTO weaponthree (characterid, threetrainattack, threetrainparry, threetrainrecovery, threetraindamage, threemiscattack, threemiscparry, threemiscrecovery, threemiscdamage, threemiscinit, threename, threebasedamage, threebaserecovery, threebaseparry, threebasemeasure, threetype, threebonus, threetraits, threesize)
VALUES($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) 
ON CONFLICT (characterid)
DO 
   UPDATE SET 
    characterid = $2, threetrainattack = $3, threetrainparry = $4, threetrainrecovery = $5, threetraindamage = $6, threemiscattack = $7, threemiscparry = $8, threemiscrecovery = $9, threemiscdamage = $10, threemiscinit = $11, threename = $12, threebasedamage = $13, threebaserecovery = $14, threebaseparry = $15, threebasemeasure = $16, threetype = $17, threebonus = $18, threetraits = $19, threesize = $20