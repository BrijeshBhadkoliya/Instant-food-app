const {sellerdaBord} = require('../controller/authController');
const { adddish, viewProduct ,deleteproduct , editproduct, updataProduct , activenoac , viewprofile} = require('../controller/sellerController');

const {loader} = require('../middleware/loader');
const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const folder = path.join(__dirname, '../uploads');
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
router.get('/',sellerdaBord);
router.post('/adddish',upload.single('imges'), adddish)
router.get('/viewProduct', viewProduct) 
router.get('/deleteproduct', deleteproduct)  
router.get('/editproduct',editproduct)
router.post('/updataProduct',upload.single('imges'),updataProduct)
router.get('/activenoac',activenoac)
router.get('/viewprofile', viewprofile)

module.exports = router;  