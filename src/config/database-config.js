require('dotenv').config()

const DatabaseConfig = Object.freeze({
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017',
    name: process.env.DATABASE_NAME || 'local',
})

module.exports = DatabaseConfig