function Controller(app) {
    app.get('/', function (req, res) {
        res.send("Wellcome to the entry point!")
    })


}

module.exports = Controller