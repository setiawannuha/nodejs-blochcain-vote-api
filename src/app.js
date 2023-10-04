const express = require('express')
const cors = require('cors')
const {PORT} = require('./helpers/env')
const router = require('./routers/index')

const APP_PORT = PORT || 3000
const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  return res.send("It Works")
})
app.use(router)
app.listen(APP_PORT, () => {
  console.log(`Service running at PORT `, APP_PORT);
})

module.exports = app