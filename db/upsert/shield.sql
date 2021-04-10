INSERT INTO cvshield (characterid, shieldname, shielddr, shieldsize, shieldcover, 
    shieldbonus, shieldbasedef, shieldbaseparry, shieldbaseencumb, 
    shieldbasebreak, shieldtraindef, shieldtrainparry, shieldtrainencumb,
    shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak,
    shieldmiscencumb)
VALUES($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) 
ON CONFLICT (characterid)
DO 
   UPDATE SET 
    characterid = $2, shieldname = $3, shielddr = $4, shieldsize = $5, shieldcover = $6, 
    shieldbonus = $7, shieldbasedef = $8, shieldbaseparry = $9, shieldbaseencumb = $10, 
    shieldbasebreak = $11, shieldtraindef = $12, shieldtrainparry = $13, shieldtrainencumb = $14,
    shieldtrainbreak = $15, shieldmiscdef = $16, shieldmiscparry = $17, shieldmiscbreak = $18,
    shieldmiscencumb = $19
