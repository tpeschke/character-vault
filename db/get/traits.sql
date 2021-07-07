select id, characterid, title, value from cvtraits
where characterid = $1
order by NULLIF(regexp_replace(value, '\D', '', 'g'), '')::int desc