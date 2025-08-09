const { Pool } = require('pg')
const { databaseCredentials } = require('../server/server-config')

const pool = new Pool(databaseCredentials)

module.exports = {
    query: async (text, params) => {
        let result = []
        if (Array.isArray(params)) {
            result = await pool.query(text, params).catch(e => console.log(text, '\n', params, '\n', e))
        } else {
            result = await pool.query(text, [params]).catch(e => console.log(text, '\n', params, '\n', e))
        }
        return result?.rows ? result.rows : []
    }
}