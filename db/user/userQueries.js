module.exports = {
    createUser: "insert into usersAuth (username, auth0, tooltip) values ($1, $2, '1') RETURNING *;",
    findUser: "select *  from usersAuth where auth0 = $1",
    findUserSession: "select *  from usersAuth where id = $1"
}