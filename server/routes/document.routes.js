const db = require("../index");
const Document = db.document;
const Event = db.event;

module.exports = app => {
    const router = require("express").Router();

    router.post("/add", (req, res) => {
        const documentParams = req.body
        const doc = new Document({
            name: documentParams.name,
            date: documentParams.date,
            desc: documentParams.desc,
            event: documentParams.event,
            isSigned: false,
            role: documentParams.role
        })
        doc.save(doc)
            .then(data => {
                Event
                    .findByIdAndUpdate(doc.event, { $addToSet: { docs: [data.id] }}, { useFindAndModify: false })
                    .then()
                    .catch(err => {
                        res
                            .status(500)
                            .send({
                                message: err.message || "Some error occurred while creating the Event"
                            });
                    });
                res.send(data);
            });
    });

    // Fetch all documents
    router.get("/all", (req, res) => {
        Document.find()
            .populate("role")
            .populate("event")
            .then(data => {
                res.send(data);
            });
    })

    //Delete document
    router.delete("/:id", (req, res) => {
        const id = req.params.id;
        Document
            .findByIdAndDelete(id, { useFindAndModify: false })
            .then(data => {
                Event
                    .findByIdAndUpdate(data.event, { $pull: { docs: data.id }}, { useFindAndModify: false })
                    .then()
                res.send(data)
            });
    })

    // Update document
    router.put("/:id", (req, res) => {
        const id = req.params.id;
        const doc = req.body
        Document
            .findByIdAndUpdate(id, doc, { useFindAndModify: false })
            .then(data => {
                res.send(data)
            });
    })

    // Fetch document
    router.get("/:id", (req, res) => {
        const id = req.params.id;
        Document.findById(id)
            .populate("role")
            .populate("event")
            .then(data => {
                if (!data)
                    res.status(404).send({ message: "Not found Doc with id " + id });
                else res.send(data);
            });
    })

    app.use('/api/document', router);
};