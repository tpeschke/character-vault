module.exports = {
    nativeLanguage: "select * from cvnativelanguage where characterid = $1",
    skills: "select * from cvskills where characterid = $1 order by skill",
    skillsuites: "select * from cvcharacterskillsuites where characterid = $1 order by skillsuiteid"
}