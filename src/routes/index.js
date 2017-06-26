const axios = require('axios')
const REQUEST_URL = `'https://graph.facebook.com/v2.6/me/messages`

module.exports.indexGet = (req, res) => res.send(200)

module.exports.fbGet = (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN) {
    res.status(200).send(req.query['hub.challenge'])
  } else {
    console.error('Unauthorized FB token')
    res.sendStatus(403)
  }
}

module.exports.fbPost = (req, res) => {
  const { data } = req.body
  if (data.object === 'page') {
    data.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        const msg = event.message
        if (!msg || event['is_echo'] || !msg.text) {
          return
        }
        receivedMessage(event)
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
}

const receivedMessage = (event) => {
  const senderID = event.sender.id
  const text = event.message.text
  sendRequest({
    recipient: { id: senderID },
    message: { text: text }
  })
}
