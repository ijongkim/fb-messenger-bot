const axios = require('axios')
const User = require('./db/user')
const REQUEST_URL = `https://graph.facebook.com/v2.6/me/messages`
module.exports.HELP_MSG = [
  'Type the following commands to use your list: ',
  '- HELP: for these instructions',
  '- LIST: for a list of all your tasks',
  `#<number> DONE: to mark a task as complete. For example, '#4 DONE' will mark task #4 as complete`,
  `- ADD <task description>: to add a new task with the description. For example, 'ADD buy milk' will add this as a new task`,
  '- LIST DONE: for a list of all completed tasks'
].join('\n\n')

module.exports.constructResponse = ({ senderID, text }) => ({ recipient: { id: senderID }, message: { text: text } })

module.exports.sendResponse = data => {
  return axios({
    url: REQUEST_URL,
    params: {
      access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN
    },
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: data
  })
  .then(resp => {
    console.log(`Response data from request: `, resp.data)
  })
  .catch(err => {
    console.warn(`Error sending request: `, err.message)
  })
}

module.exports.verifyAuth = senderID => {
  return User.selectUserById({ user_id: senderID })
  .then(user => {
    if (user) {
      return Promise.resolve()
    } else {
      throw new Error('User not found in DB')
    }
  })
  .catch(_ => {
    return User.insertUser({ id: senderID })
    .then(() => Promise.resolve())
  })
}
