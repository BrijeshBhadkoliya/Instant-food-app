const adminschemaModel = require('../model/adminschema');
const bcrypt =require('bcrypt');
const ragisterGet = async (req, res) => {  
        return res.render('./pages/register');
 }


 const loginGet = async (req, res) => { 
   return res.render('./pages/login');
 }




 const sellerRagister = async (req, res) => { 
        // console.log(req.body);
        if(!req.body){
            req.session.error_msg = "All fields are required";
            return res.redirect('ragisterGet');
        } 

       const secondTime = await adminschemaModel.findOne({email:req.body.email});

        if(secondTime){
            req.session.info_msg = "Seller already exist";
        console.log(req.session);

             console.log("Seller already exist");  
            return res.redirect('ragisterGet');
        }
        const salt = await bcrypt.hash(req.body.password,10);
        req.body.password = salt;

        req.session.success_msg = "Welcome to the seller panel";
        // console.log(req.body);
        console.log(req.session);
        
        await adminschemaModel.create(req.body);
        return res.redirect('/sellerdaBord');

 }




 const sellerlogin = async (req, res) => { 
    if(!req.body){
        req.session.error_msg = "All fields are required";
        return res.redirect('/');
    } 

   const secondTime = await adminschemaModel.findOne({email:req.body.email});

    if(!secondTime){
        req.session.error_msg = "Seller is Not found";
         console.log("Seller is Not found");  
        return res.redirect('/');
    }

    const match = await bcrypt.compare(req.body.password,secondTime.password);

if(!match){
    console.log("Password is incorrect");
    req.session.error_msg = "Password is incorrect"; 
    return res.redirect('/');

}
    req.session.seller = secondTime
    req.session.success_msg = "Welcome to the sellerpanel";
    // console.log(req.body);
        return res.redirect('/sellerdaBord');
 }
 const sellerdaBord = async (req, res) => {
 
    if (!req.session.seller) {
        req.session.error_msg = "Please log in first!";
        return res.redirect('/');
    }

    return res.render('./admin/panle',{data:req.session.seller});

}

 module.exports = { ragisterGet, loginGet, sellerRagister, sellerlogin ,sellerdaBord };