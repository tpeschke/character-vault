select * from cvcharactermain
where userId != $1 or userid is null
order by name