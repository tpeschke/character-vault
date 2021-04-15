select ss.skillsuiteid, skillsuitename, skillsuitebasecost, rank from cvskillsuites ss
join cvcharacterskillsuites css on css.skillsuiteid = ss.skillsuiteid
where characterid = $1