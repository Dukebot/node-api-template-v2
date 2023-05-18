class Controller {
    constructor(baseRoute, Model) {
        this.baseRoute = baseRoute
        this.Model = Model
    }

    async get(req, res) {
        try {
            const items = await this.Model.find();
            res.send(items);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getById(req, res) {
        try {
            const id = req.params._id;
            const item = await this.Model.findById(id);
            if (!item) {
                return res.status(404).send('Item not found');
            }
            res.send(item);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async create(req, res) {
        try {
            const data = req.body;

            const item = new this.Model(data);
            const response = await item.save();

            res.send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async update(req, res) {
        try {
            const id = req.body._id;
            const data = req.body;

            const item = await this.Model.findById(id);
            if (!item) {
                return res.status(404).send('Item not found');
            }

            Object.assign(item, data);
            const response = await item.save();

            res.send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async delete(req, res) {
        try {
            const id = req.params._id;
            const response = await this.Model.findByIdAndDelete(id);
            res.send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = Controller