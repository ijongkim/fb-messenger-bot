const db = require('./index')

module.exports.insertUser = ({ id }) => db.none(`INSERT INTO users (id) VALUES ('${id}') ON CONFLICT DO NOTHING`)

module.exports.selectUserById = ({ id }) => db.oneOrNone(`SELECT * from users where id = '${id}'`)
