const userModel = require("../model/usermodel");
const adminModel = require("../model/adminschema")
const productsModel = require("../model/dishschema")
const AddcratModel = require('../model/Addtocrat')
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
    return res.redirect("/user/userRagister");
  }

  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  const secondTime = await userModel.findOne({ email: req.body.email });

  if (secondTime) {
    req.session.info_msg = "Seller already exist";
    // console.log(req.session);

    console.log("Seller already exist");
    return res.redirect("/user/userRagister");
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
        req.session.error_msg = "User is Not found";
         console.log("User is Not found");  
        return res.redirect('/user/userLogin');
    }

    const match = await bcrypt.compare(req.body.password,secondTime.password);

if(!match){
    console.log("Password is incorrect");
    req.session.error_msg = "Password is incorrect"; 
    return res.redirect('/user/userLogin');
}
    req.session.user = secondTime
    req.session.success_msg = "Welcome to the Instant App";
    // console.log(req.body);
        return res.redirect('/user');
 }
 
const viewuserProducts = async (req,res) => {
  if(!req.session.user){
    return res.redirect('/user/userLogin')
} 
const userLat  =  req.session.user.location.latitude
const userLon  =  req.session.user.location.longitude
const maxDistance =  30;

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  
  const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}



const allRestaurants = await adminModel.find({});

 
const nearbyRestaurants = allRestaurants.filter(restaurant => {
  const restLat = restaurant.location.latitude;
  const restLon = restaurant.location.longitude;
  const distance = getDistance(userLat, userLon, restLat, restLon);
  return distance <= maxDistance;
});
// console.log(nearbyRestaurants);
const nearbyids = nearbyRestaurants.map(rest => rest._id);
const products = await productsModel.find({ adminid: { $in: nearbyids } });
          //  console.log(products);
                              
           const restaurantProductsMap = {};

           // Products को Seller के हिसाब से Group करो
           products.forEach(product => {
               const restId = product.adminid.toString();
               if (!restaurantProductsMap[restId]) {
                   restaurantProductsMap[restId] = [];
               }
               restaurantProductsMap[restId].push(product);
           }); 
           
           // हर Restaurant से 1 Random Product उठाओ
           const randomProducts = Object.values(restaurantProductsMap).map(products => {
               const randomIndex = Math.floor(Math.random() * products.length);
               return products[randomIndex];
           });
          //  console.log(randomProducts,"done done done");
           
      return res.render('./users/categories',{produts:randomProducts})
}

const addcrat = async (req,res) =>{
  if(!req.session.user){
    return res.redirect('/user/userLogin')
}
  const id = req.query.id;
   const userid = req.session.user._id
  //  console.log(userid);
   
   const product = await productsModel.findById(id);
  //  console.log(product);
    const  model =  await AddcratModel.create({userid:userid,adminid:product.adminid,dname:product.dname,ddescription:product.ddescription,price:product.price,imges:product.imges})
    console.log(model);
    
       return res.redirect('/user/viewuserProducts')
}
module.exports = {
  userPage,
  userchack,
  userLogin,
  userRagister,
  userRagisterdata,
  userlogindata,
  viewuserProducts,
  addcrat
};
