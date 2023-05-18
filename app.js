const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const mongoose = require('mongoose')

const Config = require('./src/config')
const Router = require('./src/router')

const env = Config.app.env
const port = Config.app.port
const corsOptions = {}
const rateLimitOptions = Config.rateLimit
const limit = '50mb'
const databaseConnectionUrl = Config.database.url + '/' + Config.database.name

console.log('App starting...', { env, port, corsOptions, rateLimitOptions, limit, databaseConnectionUrl })

const app = express()

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ limit, extended: false }))
app.use(bodyParser.json({ limit }))
app.use(rateLimit(rateLimitOptions))

Router(app)

app.use(function (err, req, res, next) {
    console.error(err)
    // res.status(500).json({ error: 'Internal Server Error' })
    res.status(500).json(err)
})

app.use(function (req, res, next) {
    res.status(404).send({ error: true, status: 404, message: 'URL not found' })
})

mongoose.connect(databaseConnectionUrl).then(() => {
    console.log('Mongoose connected')
})

app.listen(port, () => {
    console.log("The server is initialized at port...", port)
})