module.exports = require("mongoose").model("Dishes", new  require("mongoose").Schema({
    adminid: { ref: "Admin", type: require("mongoose").Schema.Types.ObjectId, required: true },
    dname: { type: String, required: true }, ddescription: { type: String, required: true },
    price: { type: String, required: true}, imges: { type: String},
    status: { type: String, default: "true" }
}));
