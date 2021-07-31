INSERT INTO cvarmor (characterid, armorname, armordr, armorskilladj, armorbonus, 
    armortrainingdef, armortrainrecovery, armortrainfatigue, armortraininit, 
    armormiscdef, armormiscrecovery, armormiscinit, armormiscfatigue, armorbasedef,
    armorbaserecovery, armorbasefatigue, armorbaseinit)
VALUES($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
ON CONFLICT (characterid)
DO 
   UPDATE SET 
    characterid = $2, armorname = $3, armordr = $4, armorskilladj = $5, armorbonus = $6, 
    armortrainingdef = $7, armortrainrecovery = $8, armortrainfatigue = $9, armortraininit = $10, 
    armormiscdef = $11, armormiscrecovery = $12, armormiscinit = $13, armormiscfatigue = $14,
    armorbasedef = $15, armorbaserecovery = $16, armorbasefatigue = $17, armorbaseinit = $18
