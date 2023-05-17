const mongoose = require('mongoose')

const Item = mongoose.model('Item', new mongoose.Schema({
    name: String,
    description: String,
}))

module.exports = Item