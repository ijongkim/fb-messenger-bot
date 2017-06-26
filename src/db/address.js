const db = require('./index')

module.exports.selectAddressesByUserID = ({ user_id }) => db.manyOrNone(`SELECT * FROM addresses where user_id=${user_id}`)
