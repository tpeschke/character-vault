
INSERT INTO weaponone (characterid, onetrainattack, onetrainparry, onetrainrecovery, onetraindamage, onemiscattack, onemiscparry, onemiscrecovery, onemiscdamage, onemiscinit, onename, onebasedamage, onebaserecovery, onebaseparry, onebasemeasure, onetype, onebonus, onetraits, onesize)
VALUES($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) 
ON CONFLICT (characterid)
DO 
   UPDATE SET 
    characterid = $2, onetrainattack = $3, onetrainparry = $4, onetrainrecovery = $5, onetraindamage = $6, onemiscattack = $7, onemiscparry = $8, onemiscrecovery = $9, onemiscdamage = $10, onemiscinit = $11, onename = $12, onebasedamage = $13, onebaserecovery = $14, onebaseparry = $15, onebasemeasure = $16, onetype = $17, onebonus = $18, onetraits = $19, onesize = $20