const axios = require('axios')
const REQUEST_URL = `https://graph.facebook.com/v2.6/me/messages`

module.exports.indexGet = (req, res) => res.sendStatus(200)

module.exports.fbGet = (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN) {
    res.status(200).send(req.query['hub.challenge'])
  } else {
    console.error('Unauthorized FB token')
    res.sendStatus(200)
  }
}

module.exports.fbPost = (req, res) => {
  const data = req.body
  if (data.object === 'page') {
    data.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message) {
          receivedMessage(event)
        }
      })
    })
  }
  res.sendStatus(200)
}

const sendRequest = data => {
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

const receivedMessage = (event) => {
  const senderID = event.sender.id
  const text = event.message.text
  return sendRequest({
    recipient: { id: senderID },
    message: { text: text }
  })
}
