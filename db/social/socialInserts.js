module.exports = {
    descriptions: "INSERT INTO cvdescriptions (characterid, title, value) VALUES($2, $3, $4)  ON CONFLICT (id) DO     UPDATE SET characterid = $2, title = $3, value = $4",
    devotions: "INSERT INTO cvdevotions (characterid, title, value) VALUES($2, $3, $4)  ON CONFLICT (id) DO     UPDATE SET characterid = $2, title = $3, value = $4",
    flaws: "INSERT INTO cvflaws (characterid, title, value) VALUES($2, $3, $4)  ON CONFLICT (id) DO     UPDATE SET characterid = $2, title = $3, value = $4",
    goals: "INSERT INTO cvgoals (characterid, goal) VALUES($2, $3)  ON CONFLICT (id) DO     UPDATE SET characterid = $2, goal = $3",
    reputation: "INSERT INTO cvreputation (characterid, value) VALUES($2, $3)  ON CONFLICT (id) DO     UPDATE SET characterid = $2, value = $3",
    traits: "INSERT INTO cvtraits (characterid, title, value) VALUES($2, $3, $4)  ON CONFLICT (id) DO     UPDATE SET characterid = $2, title = $3, value = $4"
}