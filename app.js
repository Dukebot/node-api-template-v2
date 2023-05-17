const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const mongoose = require('mongoose')

const Config = require('./src/config')
const Controller = require('./src/controller')

const env = Config.app.env
const port = Config.app.port
const corsOptions = {}
const rateLimitOptions = Config.rateLimit
const limit = '50mb'

console.log('App starting...', { env, port, corsOptions, rateLimitOptions, limit })

const app = express()

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ limit, extended: false }))
app.use(bodyParser.json({ limit }))
app.use(rateLimit(rateLimitOptions))

Controller(app)

app.use(function (req, res, next) {
    res.status(404).send({ error: true, status: 404, message: 'URL not found' })
})

mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
    console.log('Mongoose connected')
})

app.listen(port, () => {
    console.log("The server is initialized at port...", port)
})