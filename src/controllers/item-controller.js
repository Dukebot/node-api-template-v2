const CRUDController = require('./base/crud-controller')
const Item = require('../models/item')

class ItemController extends CRUDController {
    constructor() {
        super(Item)
    }
}

module.exports = new ItemController()