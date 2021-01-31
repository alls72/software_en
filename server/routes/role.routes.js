const db = require("../index")
const Role = db.role

module.exports = app => {
    const router = require("express").Router();

    router.post("/add", (req, res) => {
        const roleParams = req.body
        const role = new Role({
            name: roleParams.name
        })

        role
            .save(role)
            .then(data => {
                res.send(data);
            });
    });

    router.delete("/:id", (req, res) => {
        const id = req.params.id;
        Role.findByIdAndRemove(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot delete Role with id=${id}`
                    });
                } else {
                    res.send({
                        message: "Role was deleted successfully!"
                    });
                }
            });
    });

    router.get("/all", (req, res) => {
        Role.find()
            .populate("users")
            .then(data => {
                res.send(data);
            });
    });

    router.get("/:id", (req, res) => {
        const id = req.params.id;
        Role.findById(id)
            .populate("users")
            .then(data => {
                if (!data)
                    res.status(404).send({ message: "Not found Role with id " + id });
                else res.send(data);
            });
    })
    app.use('/api/role', router);
};