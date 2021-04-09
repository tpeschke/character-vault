INSERT INTO cvarmor (characterid, armorname, armordr, armorskilladj, armorbonus, 
    armortrainingdef, armortrainrecovery, armortrainencumb, armortraininit, 
    armormiscdef, armormiscrecovery, armormiscinit, armormiscencumb, armorbasedef,
    armorbaserecovery, armorbaseencumb, armorbaseinit)
VALUES($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
ON CONFLICT (characterid)
DO 
   UPDATE SET 
    characterid = $2, armorname = $3, armordr = $4, armorskilladj = $5, armorbonus = $6, 
    armortrainingdef = $7, armortrainrecovery = $8, armortrainencumb = $9, armortraininit = $10, 
    armormiscdef = $11, armormiscrecovery = $12, armormiscinit = $13, armormiscencumb = $14,
    armorbasedef = $15, armorbaserecovery = $16, armorbaseencumb = $17, armorbaseinit = $18
