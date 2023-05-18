const Controller = require('./controller')
const Model = require('../models/item')

const baseRoute = '/item'

function ItemController(app) {
    const controller = new Controller(baseRoute, Model)

    app.get(baseRoute, controller.get.bind(controller))
    app.get(baseRoute + '/:id', controller.getById.bind(controller))
    app.post(baseRoute, controller.create.bind(controller))
    app.put(baseRoute, controller.update.bind(controller))
    app.delete(baseRoute + '/:id', controller.delete.bind(controller))
}

module.exports = ItemController