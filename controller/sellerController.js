const adminschemaModel = require("../model/adminschema");
const dishschemaModel = require("../model/dishschema");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const adddish = async (req, res) => {
  try {
    // console.log(req.body);

    if (!req.body) {
      req.session.error_msg = "All fields are required";
      return res.redirect("/");
    }

    const response = await cloudinary.uploader.upload(req.file.path);

    const newDish = await dishschemaModel.create({
      ...req.body,
      imges: response.secure_url,
    });

    console.log(newDish);

    fs.unlinkSync(req.file.path);
    req.session.success_msg = "Dish added successfully";
    return res.redirect("/sellerdaBord");
  } catch (error) {
    console.error("Error adding dish:", error);
    req.session.error_msg = "Something went wrong. Please try again.";
    return res.redirect("/");
  }
};
const viewProduct = async (req, res) => {
  if (!req.session.seller) {
    req.session.error_msg = "Please log in first!";
    return res.redirect("/");
  }

  const admin = req.session.seller;
  //    console.log(admin._id);

  const produts = await dishschemaModel.find({ adminid: admin._id });
  // console.log(produts);
  return res.render("./admin/tableView", { produts, data: admin });
};

const deleteproduct = async (req, res) => {
  if (!req.session.seller) {
    req.session.error_msg = "Please log in first!";
    return res.redirect("/");
  }

  const id = req.query.id;
  console.log(id);

  const singel = await dishschemaModel.findById(id);

  await cloudinary.uploader.destroy(singel.imges);
  await dishschemaModel.findByIdAndDelete(id);

  return res.redirect("/sellerdaBord/viewProduct");
};

const editproduct = async (req, res) => {
  if (!req.session.seller) {
    req.session.error_msg = "Please log in first!";
    return res.redirect("/");
  }

  const admin = req.session.seller;
  const id = req.query.id;
  console.log(id);

  const product = await dishschemaModel.findById(id);

  return res.render("./admin/editpanle", { product, data: admin });
};

const updataProduct = async (req, res) => {
  if (!req.session.seller) {
    req.session.error_msg = "Please log in first!";
    return res.redirect("/");
  }
  if (req.file) {
    const { editid } = req.body;
    const single = await dishschemaModel.findById(editid);
    await cloudinary.uploader.destroy(single.imges);
    const response = await cloudinary.uploader.upload(req.file.path);
    const newDish = await dishschemaModel.findByIdAndUpdate(editid, {
      ...req.body,
      imges: response.secure_url,
    });

    console.log(newDish);

    fs.unlinkSync(req.file.path);
    req.session.success_msg = "Dish added successfully";
    return res.redirect("/sellerdaBord/viewProduct");

  } else {

    const { editid } = req.body;
   
    const newDish = await dishschemaModel.findByIdAndUpdate(editid,req.body);
    console.log(newDish);
    req.session.success_msg = "Dish added successfully";
    return res.redirect("/sellerdaBord/viewProduct");

  }

};

const activenoac = async (req, res) => {
    if (!req.session.seller) {
        req.session.error_msg = "Please log in first!";
        return res.redirect("/");
      }    
  const id = req.query.id;
  const status = req.query.status;
         
  if(status == "true"){
    
     await dishschemaModel.findByIdAndUpdate(id,{status:false});

    return res.redirect("/sellerdaBord/viewProduct");

  }else{
    await dishschemaModel.findByIdAndUpdate(id,{status:true});
    return res.redirect("/sellerdaBord/viewProduct");

  }
};

module.exports = {
  viewProduct,
  adddish,
  deleteproduct,
  editproduct,
  updataProduct,
  activenoac
};
