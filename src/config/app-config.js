require('dotenv').config()

const AppConfig = Object.freeze({
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
})

module.exports = AppConfig