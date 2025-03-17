const { loginGet, ragisterGet , sellerRagister ,sellerlogin  ,logout ,underConstrction, coomingSoon , forgetpass , verifymail , chackotp , changepaword , googlecallback ,uploadlogo} = require('../controller/authController');

const {loader} = require('../middleware/loader');
const router = require('express').Router();

const passport = require("passport");
const jwt = require("jsonwebtoken");

const path = require('path');
const fs = require('fs');
const folder = path.join(__dirname, '../logos');
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'logos')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
router.get('/',loginGet);
router.get('/ragisterGet',ragisterGet);
router.post('/sellerRagister',sellerRagister);
router.post('/sellerlogin',sellerlogin); 
router.get('/logout', logout)
router.get('/underConstrction',underConstrction);
router.get('/coomingSoon',coomingSoon);
router.get('/forgetpass',forgetpass)
router.post('/verifymail', verifymail)
router.post('/chackotp', chackotp)
router.post('/changepaword',changepaword)
router.get('/google/callback',passport.authenticate("google", { failureRedirect: "/" }),googlecallback)
router.get("/google",passport.authenticate("google", { scope: ["profile", "email"] })); 
router.post('/uploadlogo',upload.single('logo'),uploadlogo) 



module.exports = router; 