select * from cvcharactermain
where userId != $1 or userid is null
ORDER BY RANDOM()
LIMIT 10