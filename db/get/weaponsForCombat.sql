(SELECT weaponid, name, baserecovery, miscrecovery, trainrecovery from weaponone where characterid = $1)
union
(select weaponid, name, baserecovery, miscrecovery, trainrecovery from weapontwo where characterid = $1)
union
(select weaponid, name, baserecovery, miscrecovery, trainrecovery from weaponthree where characterid = $1)
union
(select weaponid, name, baserecovery, miscrecovery, trainrecovery from weaponfour where characterid = $1)