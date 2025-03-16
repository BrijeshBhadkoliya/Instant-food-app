const { loginGet, ragisterGet , sellerRagister ,sellerlogin , sellerdaBord} = require('../controller/authController');

const {loader} = require('../middleware/loader');
const router = require('express').Router();
router.get('/',loginGet);
router.get('/ragisterGet',ragisterGet);
router.post('/sellerRagister',sellerRagister);
router.post('/sellerlogin',sellerlogin); 



module.exports = router; 