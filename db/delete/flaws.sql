delete from cvflaws where characterid = $1 and id != ANY($2)