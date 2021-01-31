const db = require("../index");
const User = db.user;
const hash = require("password-hash");

module.exports = app => {
    const router = require("express").Router();

    router.get("/:id", (req, res) => {
        const id = req.params.id;
        User.findById(id)
            .populate("event")
            .populate("role")
            .then(data => {
                if (!data)
                    res.status(404).send({ message: "Not found User with id " + id });
                else res.send(data);
            });
    });

    router.post("/update_password", (req, res) => {
        const id = req.body.userId;
        const newPassword = req.body.newPassword
        User.updateOne({ _id: id}, { password: hash.generate(newPassword) })
            .then(data => {
                if (!data)
                    res.status(404).send({ message: "Not found User with id " + id });
                else res.send(data);
            });
    });

    router.put("/update_profile/:id", (req, res) => {
        const id = req.params.id;
        User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot update Profile with id=${id}. Maybe Profile was not found!`
                    });
                } else res.send(data);
            });
    });

    router.post("/update_pin", (req, res) => {
        const id = req.body.id;
        const newPin = req.body.pin
        User.updateOne({ _id: id}, { pin: newPin })
            .then(data => {
                if (!data)
                    res.status(404).send({ message: "Not found User with id " + id });
                else res.send(data);
            });
    })

    app.use('/api/profile', router);
};