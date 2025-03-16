module.exports = require("mongoose").model("Admin", new  require("mongoose").Schema({
    fname: { type: String, required: true }, lname: { type: String, required: true },
    email: { type: String, required: true , unique:true}, password: { type: String, required: true },
    phone: { type: Number, required: true }, resturentname: { type: String, required: true }
}));
