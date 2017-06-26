const promise = require('bluebird')
const options = { promiseLib: promise }
const dbUrl = process.env.DATABASE_URL || `postgres://root:@localhost:5432/fb_messenger_bot`
const pgp = require('pg-promise')(options)

module.exports = pgp(dbUrl)
