delete from cvgearfour where characterid = $1 and id != ANY($2)