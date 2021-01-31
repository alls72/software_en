module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const eventSchema = new Schema({
        name: String,
        start: String,
        CStart: String,
        CFinish: String,
        finish: String,
        image: String,
        docs: [{
            type: Schema.Types.ObjectId,
            ref: "Document",
        }],
        users: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }]
    })

    eventSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("Event", eventSchema);
};