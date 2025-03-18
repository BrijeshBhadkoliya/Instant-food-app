const adminschemaModel = require("../model/adminschema");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const ragisterGet = async (req, res) => {
  return res.render("./pages/register");
};

const loginGet = async (req, res) => {
  return res.render("./pages/login");
};

const sellerRagister = async (req, res) => {
  // console.log(req.body);
  if (!req.body) {
    req.session.error_msg = "All fields are required";
    return res.redirect("ragisterGet");
  }

  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  const secondTime = await adminschemaModel.findOne({ email: req.body.email });

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

  await adminschemaModel.create({
    ...req.body,
    location: { latitude, longitude },
  });
  return res.redirect("/");
};

const sellerlogin = async (req, res) => {
  if (!req.body) {
    req.session.error_msg = "All fields are required";
    return res.redirect("/");
  }

  const secondTime = await adminschemaModel.findOne({ email: req.body.email });

  if (!secondTime) {
    req.session.error_msg = "Seller is Not found";
    console.log("Seller is Not found");
    return res.redirect("/");
  }

  const match = await bcrypt.compare(req.body.password, secondTime.password);

  if (!match) {
    console.log("Password is incorrect");
    req.session.error_msg = "Password is incorrect";
    return res.redirect("/");
  }
  req.session.seller = secondTime;
  req.session.success_msg = "Welcome to the sellerpanel";
  // console.log(req.body);
  return res.redirect("/sellerdaBord");
};
const sellerdaBord = async (req, res) => {
  if (!req.session.seller) {
    req.session.error_msg = "Please log in first!";
    return res.redirect("/");
  }

  return res.render("./admin/panle", { data: req.session.seller });
};
const logout = async (req, res) => {
  return res.redirect("/");
};

const underConstrction = async (req, res) => {
  return res.render("./pages/under-construction");
};

const coomingSoon = async (req, res) => {
  return res.render("./pages/coming-soon");
};

const forgetpass = async (req, res) => {
  return res.render("./pages/forgot-password");
};

const verifymail = async (req, res) => {
  const email = req.body.email;
  console.log(req.body);

  const otp = Math.floor(1000 + Math.random() * 999999);
  //  var transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: 'bhadkoliyajbrijesh@gmail.com',
  //       pass: '5610'
  //     }
  //   });

  //   var mailOptions = {
  //     from: 'bhadkoliyajbrijesh@gmail.com',
  //     to: email,
  //     subject: 'Sending Email using Node.js',
  //     text:  `your Otp is ${otp}`
  //   };

  //   transporter.sendMail(mailOptions, function(error, info){
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log('Email sent: ' + info.response);
  //     }
  //   });

  res.cookie("otp", otp);
  res.cookie("email", email);
  return res.render("./pages/code-verification", { email });
};
const chackotp = (req, res) => {
  const { a, b, c, d, e, f } = req.body;
  const mainotp = req.cookies.otp;
  const otp = a + b + c + d + e + f;

  if (mainotp === otp) {
    return res.render("./pages/reset-password");
  }
};
const changepaword = async (req, res) => {
  const email = req.cookies.email;
  console.log(email);
  const { conpassword, changpassword } = req.body;
  console.log(req.body);

  if (conpassword === changpassword) {
    const user = await adminschemaModel.findOne({ email });
    const hashpass = await bcrypt.hash(changpassword, 10);
    await adminschemaModel.findByIdAndUpdate(user._id, { password: hashpass });
    return res.redirect("/");
  }
  return res.render("./pages/reset-password");
};

const googlecallback = async (req, res) => {
  // const token = jwt.sign({ userId: req.user.id }, "secret", { expiresIn: "1h" });
  // res.cookie("token", token);
  if (req.user.type === "admin") {
    req.session.seller = req.user;
    req.session.success_msg = "Welcome to the Seller Panel";
    console.log(req.user);

    res.redirect("/sellerdaBord");
  } else {
    req.session.user = req.user;
    req.session.success_msg = "Welcome to the Instant-food-app";
    console.log(req.user);

    res.redirect("/user");
  }
};

const uploadlogo = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const response = await cloudinary.uploader.upload(req.file.path);

  req.session.success_msg = "Dish added successfully";
  req.session.seller.logo = response.secure_url;
  await adminschemaModel.findByIdAndUpdate(id, { logo: response.secure_url });
  fs.unlinkSync(req.file.path);
  return res.redirect("/sellerdaBord/viewprofile");
};

module.exports = {
  ragisterGet,
  loginGet,
  sellerRagister,
  sellerlogin,
  sellerdaBord,
  logout,
  underConstrction,
  coomingSoon,
  forgetpass,
  verifymail,
  chackotp,
  changepaword,
  googlecallback,
  uploadlogo,
};
 