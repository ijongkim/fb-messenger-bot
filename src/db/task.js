const db = require('./index')

module.exports.selectTasks = ({ user_id }) => db.manyOrNone(`SELECT * FROM tasks where user_id = '${user_id}'`)

module.exports.selectTaskById = ({ id }) => db.oneOrNone(`SELECT * FROM tasks where id = ${id}`)

module.exports.insertTask = ({ description, user_id }) => db.none(`INSERT INTO tasks (description, user_id) VALUES ('${description}', '${user_id}')`)

module.exports.markAsComplete = ({ id }) => db.none(`UPDATE tasks SET completed = true WHERE id = ${id}`)
