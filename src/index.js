const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { indexGet, fbGet, fbPost } = require('./routes')
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'localhost'
const ENV = process.env.NODE_ENV

app.use(bodyParser.json())

app.get('/fb_webhook', fbGet)
app.post('/fb_webhook', fbPost)
app.get('/', indexGet)

if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Listening at: ${HOST}:${PORT} in ${ENV} environment`)
  })
}
