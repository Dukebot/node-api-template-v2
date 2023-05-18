const Controller = require('./controller');

/**
 * Base class for all controllers that need to perform CRUD operations via Model.
 */
class CRUDController extends Controller {
    constructor(Model) {
        super();
        this.Model = Model;
    }

    /**
     * Get all items.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async get(req, res) {
        const items = await this.Model.find();
        res.send(items);
    }

    /**
     * Get an item by ID.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getById(req, res) {
        const id = req.params._id;

        const item = await this.Model.findById(id);
        if (!item) {
            return res.status(404).send('Item not found');
        }

        res.send(item);
    }

    /**
     * Create a new item.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async create(req, res) {
        const data = req.body;

        const item = new this.Model(data);
        const response = await item.save();

        res.send(response);
    }

    /**
     * Update an item.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async update(req, res) {
        const id = req.body._id;
        const data = req.body;

        const item = await this.Model.findById(id);
        if (!item) {
            return res.status(404).send('Item not found');
        }

        Object.assign(item, data);
        const response = await item.save();

        res.send(response);
    }

    /**
     * Delete an item.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async delete(req, res) {
        const id = req.params._id;
        const response = await this.Model.findByIdAndDelete(id);
        res.send(response);
    }
}

module.exports = CRUDController;