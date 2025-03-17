const userModel = require("../model/usermodel");
const bcrypt = require("bcrypt");
const userPage = (req, res) => {
  return res.render("./users/index");
};
const userchack = async (req, res) => {
  return res.render("./pages/check-mail");
};

const userLogin = async (req, res) => {
  return res.render("./pages/userlogin");
};
const userRagister = async (req, res) => {
  return res.render("./pages/userragister");
};
const userRagisterdata = async (req, res) => {
  if (!req.body) {
    req.session.error_msg = "All fields are required";
    return res.redirect("ragisterGet");
  }

  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  const secondTime = await userModel.findOne({ email: req.body.email });

  if (secondTime) {
    req.session.info_msg = "Seller already exist";
    // console.log(req.session);

    console.log("Seller already exist");
    return res.redirect("ragisterGet");
  }
  const salt = await bcrypt.hash(req.body.password, 10);
  req.body.password = salt;

  req.session.success_msg = "Welcome to the seller panel";
  // console.log(req.body);
  // console.log(req.session);

  await userModel.create({ ...req.body, location: { latitude, longitude } });
  return res.redirect("/user/userLogin");
};


const userlogindata = async (req, res) => { 
    if(!req.body){
        req.session.error_msg = "All fields are required";
        return res.redirect('/user/userLogin');
    } 

   const secondTime = await userModel.findOne({email:req.body.email});

    if(!secondTime){
        req.session.error_msg = "Seller is Not found";
         console.log("User is Not found");  
        return res.redirect('/user/userLogin');
    }

    const match = await bcrypt.compare(req.body.password,secondTime.password);

if(!match){
    console.log("Password is incorrect");
    req.session.error_msg = "Password is incorrect"; 
    return res.redirect('/user/userLogin');
}
    req.session.seller = secondTime
    req.session.success_msg = "Welcome to the Instant App";
    // console.log(req.body);
        return res.redirect('/user');
 }
 
module.exports = {
  userPage,
  userchack,
  userLogin,
  userRagister,
  userRagisterdata,
  userlogindata
};
