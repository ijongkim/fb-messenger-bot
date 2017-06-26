const db = require('./index')

module.exports.selectUsers = () => db.manyOrNone(`SELECT * from users`)
