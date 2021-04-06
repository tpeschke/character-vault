select main.*, cvex.extolevel from cvcharactermain main
left join cvex on cvex.level = main.level
where main.id = $1