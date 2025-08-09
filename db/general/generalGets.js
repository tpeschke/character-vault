module.exports = {
    allUsersCharacters: "select * from cvcharactermain where userId = $1 order by name",
    allCharacters: "select * from cvcharactermain where userId != $1 or userid is null ORDER BY RANDOM() LIMIT 10",
    character: "select * from cvcharactermain main where main.id = $1",
    characterName: "select name, primarya from cvcharactermain where id = $1",
    characterUserId: "select userid from cvcharactermain c where id = $1",
    userCharacterCount: "select count(*) from cvcharactermain where userId = $1"
}