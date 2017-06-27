const Task = require('../db/task')
const { sendRequest, verifyAuth, constructResponse, HELP_MSG } = require('../utils')

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
          handleMessageRequest(event)
        }
      })
    })
  }
  res.sendStatus(200)
}

const handleMessageRequest = event => {
  const senderID = event.sender.id
  return verifyAuth(senderID)
  .then(() => respondToRequest(event))
}

const respondToRequest = event => {
  const text = event.message.text
  const senderID = event.sender.id
  let response
  if (text.match('ADD')) {
    const request = text.match(/ADD (.*)/)[1]
    Task.insertTask({ user_id: senderID, description: request })
    .then(() => {
      response = constructResponse({ senderID: senderID, text: `To-do item “${request}” added to list.` })
    })
  } else if (text.match('LIST DONE')) {
    Task.selectCompletedTasks({ user_id: senderID })
    .then(tasks => {
      response = constructResponse({ senderID: senderID, text: formatListResponse(tasks, `You have ${tasks.length} item marked as done:`, true) })
    })
  } else if (text.match('LIST')) {
    Task.selectTasks({ user_id: senderID })
    .then(tasks => {
      response = constructResponse({ senderID: senderID, text: formatListResponse(tasks, `You currently have ${tasks.length} to-do items:`) })
    })
  } else if (text.match(/#(.) DONE/)) {
    const taskID = parseInt(text.match(/#(.) DONE/)[1])
    Task.markAsComplete({ id: taskID })
    .then(description => {
      response = constructResponse({ senderID: senderID, text: `To-do item ${taskID} (“${description}") marked as done.` })
    })
  } else {
    console.log(event, senderID, constructResponse)
    response = constructResponse({ senderID: senderID, text: HELP_MSG })
  }
  return sendRequest(response)
}

const formatListResponse = (data, botMessage, showCompleted = false) => {
  const tasks = data.map((task, i) => {
    const msg = `#${task.id}: ${task.description}`
    return showCompleted ? `${msg} completed (${task.date_modified.toUTCString()})` : msg
  })
  return [botMessage].concat(tasks).join('\n')
}
