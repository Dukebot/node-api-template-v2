class Router {
    constructor(app) {
        this.app = app
    }

    setCRUDRoutes(path, controller) {
        this.app.get('/items', controller.get.bind(controller));
        this.app.get('/items/:id', controller.getById.bind(controller));
        this.app.post('/items', controller.create.bind(controller));
        this.app.put('/items/:id', controller.update.bind(controller));
        this.app.delete('/items/:id', controller.delete.bind(controller));
    }
}

module.exports = Router