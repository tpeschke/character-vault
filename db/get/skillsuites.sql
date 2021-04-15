select ss.skillsuiteid, skillsuitename, skillsuitebasecost, rank, characterskillsuitesid from cvskillsuites ss
left join cvcharacterskillsuites css on css.skillsuiteid = ss.skillsuiteid
where characterid = $1 or characterid is null
order by skillsuiteid