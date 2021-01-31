const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = "mongodb+srv://alls72:project_password@cluster0.err4t.mongodb.net/utmn_project?retryWrites=true&w=majority";

db.user = require("./models/user.js")(mongoose);
db.role = require("./models/role.js")(mongoose);
db.event = require("./models/event.js")(mongoose);
db.document = require("./models/document")(mongoose);

module.exports = db;