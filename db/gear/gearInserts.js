module.exports = {
    gearfour: "INSERT INTO cvgearfour (characterid, title, value) VALUES($2, $3, $4)  ON CONFLICT (id) DO  UPDATE SET characterid = $2, title = $3, value = $4 where id = $1",
    gearone: "INSERT INTO cvgearone (characterid, title, value) VALUES($2, $3, $4)  ON CONFLICT (id) DO  UPDATE SET characterid = $2, title = $3, value = $4 where id = $1",
    gearthree: "INSERT INTO cvgearthree (characterid, title, value) VALUES($2, $3, $4)  ON CONFLICT (id) DO  UPDATE SET characterid = $2, title = $3, value = $4 where id = $1",
    geartwo: "INSERT INTO cvgeartwo (characterid, title, value) VALUES($2, $3, $4)  ON CONFLICT (id) DO  UPDATE SET characterid = $2, title = $3, value = $4 where id = $1"
}