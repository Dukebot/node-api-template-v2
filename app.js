const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')

const Config = require('./src/config')

const env = Config.app.env
const port = Config.app.port
const corsOptions = (env === 'production') ? Config.cors : {}
const rateLimitOptions = Config.rateLimit
const limit = '50mb'

console.log('App starting...', { env, port, corsOptions, rateLimitOptions, limit })

const app = express()

app.use(cors(corsOptions))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', corsOptions.allowedOrigins.join(' '))
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(bodyParser.urlencoded({ limit, extended: false }))
app.use(bodyParser.json({ limit }))

app.use(rateLimit(rateLimitOptions))

// SET APP ROUTES
// ...

app.use(function (req, res, next) {
    res.status(404).send({ error: true, status: 404, message: 'URL not found' })
})

// TODO Conexión a la BBDD con Mongoose
// ...

app.listen(port, () => {
    console.log("The server is initialized at port...", port)
})