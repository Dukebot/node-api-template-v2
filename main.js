const mongoose = require('mongoose')
const Item = require('./src/models/item')

mongoose.connect('mongodb://127.0.0.1:27017/local').then(async () => {
    console.log('Mongoose connected')

    const item = new Item({ name: 'My Item Name' });
    console.log(item.name);

    await item.save()
})