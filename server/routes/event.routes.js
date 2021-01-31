const db = require("../index");
const Event = db.event;
const User = db.user;
const Role = db.role

module.exports = app => {

    const router = require("express").Router();

    router.get("/all", (req, res) => {
        Event.find()
            .populate("users")
            .populate("docs")
            .then(data => {
                res.send(data);
            });
    })

    router.post("/add", (req, res) => {
        const eventParams = req.body
        const event = new Event({
            name: eventParams.name,
            start: eventParams.start,
            CStart: eventParams.CStart,
            CFinish: eventParams.CFinish,
            finish: eventParams.finish,
            image: eventParams.image
        })

        event
            .save(event)
            .then(data => {
                res.send(data);
            });
    });

    router.get("/:id", (req, res) => {
        const id = req.params.id;
        Event.findById(id)
            .populate("users")
            .populate("docs")
            .then(data => {
                if (!data)
                    res.status(404).send({ message: "Not found Event with id " + id });
                else res.send(data);
            });
    })

    router.put("/:id", (req, res) => {
        const id = req.params.id;
        const event = req.body
        Event
            .findByIdAndUpdate(id, event, { useFindAndModify: false })
            .then(data => {
                res.send(data)
            });
    })

    router.put("/addUser/:id", (req, res) => {
        const id = req.params.id;
        const body = req.body
        const userId = body.user.id;
        const oldRoleId = body.user.role._id
        const roleId = body.role
        Event
            .findByIdAndUpdate(id, { $addToSet: { users: [userId] }}, { new: true })
            .then(data => {
                if (!data)
                    res.status(404).send({ message: "Not found User with id " + id });
                else {
                    User.findByIdAndUpdate(
                        userId,
                        { event: data.id, role: roleId },
                        { new: true })
                        .then(data => {
                            Role
                                .findByIdAndUpdate(oldRoleId, { $pull: { users: userId } }, { new: true })
                                .then(res => {
                                    Role
                                        .findByIdAndUpdate(roleId, { $addToSet: { users: [userId] } }, { new: true })
                                        .then(res => {
                                        })
                                })
                            res.send(data);
                        });
                }
            });
    })

    router.put("/removeUser/:id", (req, res) => {
        const id = req.params.id;
        const user = req.body.user;
        const oldRoleId = user.role._id
        const noRole = "5fc37f90f2a8280450a4176b"
        Event
            .findByIdAndUpdate(id, { $pull: { users: user.id } })
            .then(data => {
                if (!data)
                    res.status(404).send({ message: "Not found User with id " + id });
                else {
                    User.findByIdAndUpdate(
                        user.id,
                        { event: null, role: noRole })
                        .then(data => {
                            Role
                                .findByIdAndUpdate(oldRoleId, { $pull: { users: user.id } }, { new: true })
                                .then(res => {
                                    Role
                                        .findByIdAndUpdate(noRole, { $addToSet: { users: [user.id] } }, { new: true })
                                        .then(res => {
                                        })
                                })
                            res.send(data)
                        })
                }
            });
    })

    app.use('/api/event', router);
};