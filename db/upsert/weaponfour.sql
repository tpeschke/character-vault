INSERT INTO weaponfour (characterid, fourtrainattack, fourtrainrecovery, fourtraindamage, fourmiscattack, fourmiscrecovery, fourmiscdamage, fourmiscinit, fourname, fourbasedamage, fourbaserecovery, fourtype, fourbonus, fourtraits, foursize)
VALUES($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) 
ON CONFLICT (characterid)
DO 
   UPDATE SET 
    characterid = $2, fourtrainattack = $3, fourtrainrecovery = $4, fourtraindamage = $5, fourmiscattack = $6, fourmiscrecovery = $7, fourmiscdamage = $8, fourmiscinit = $9, fourname = $10, fourbasedamage = $11, fourbaserecovery = $12, fourtype = $13, fourbonus = $14, fourtraits = $15, foursize = $16