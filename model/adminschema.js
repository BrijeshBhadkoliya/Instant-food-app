module.exports = require("mongoose").model("Admin", new  require("mongoose").Schema({
    fname: { type: String, required: true }, lname: { type: String, required: true },
    email: { type: String, required: true , unique:true}, password: { type: String, required: true },
    phone: { type: Number, required: true }, resturentname: { type: String, required: true },
    logo:{type:String,default:"https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg",require:true},  location: { latitude:{type: Number, required: true  }, longitude:{type: Number, required: true } }
}));
