module.exports = require("mongoose").model("User", new  require("mongoose").Schema({
    username: { type: String, required: true },email: { type: String, required: true , unique:true},
     password: { type: String, required: true },phone: { type: Number, required: true }, location: { latitude:{type: Number, required: true  }, longitude:{type: Number, required: true } }
}));
