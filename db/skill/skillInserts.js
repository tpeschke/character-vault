module.exports = {
    nativeLanguage: "INSERT INTO cvnativelanguage (characterid, language, rank) VALUES($2, $3, $4)  ON CONFLICT (characterid) DO  UPDATE SET characterid = $2, language = $3, rank =$4 where cvnativelanguage.nativeid = $1",
    skills: "INSERT INTO cvskills (characterid, skill, cost, rank, mod) VALUES($2, $3, $4, $5, $6)  ON CONFLICT (id) DO  UPDATE SET characterid = $2, skill = $3, cost = $4, rank = $5, mod = $6",
    skillsuites: "insert into cvcharacterskillsuites (skillsuiteid, characterid, rank, trained) values ($1, $2, $3, $4)"
}