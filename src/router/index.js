const Controller = require('../controllers');

/**
 * Sets up routes for CRUD operations based on the provided controller.
 * @param {Object} app - Express app object.
 * @param {string} path - Base path for the routes.
 * @param {Object} controller - Controller instance to handle the CRUD operations.
 */
function setCRUDRoutes(app, path, controller) {
    if (!path.startsWith('/')) path = '/' + path;

    // GET /items
    app.get(path, controller.get.bind(controller));

    // GET /items/:id
    app.get(path + '/:id', controller.getById.bind(controller));

    // POST /items
    app.post(path, controller.create.bind(controller));

    // PUT /items
    app.put(path, controller.update.bind(controller));

    // DELETE /items/:id
    app.delete(path + '/:id', controller.delete.bind(controller));
}

/**
 * Sets up routes for the specified entity.
 * @param {Object} app - Express app object.
 */
function Router(app) {
    // Set up CRUD routes for the 'item' entity using the 'Controller.Item' controller
    setCRUDRoutes(app, 'item', Controller.Item);
}

module.exports = Router;