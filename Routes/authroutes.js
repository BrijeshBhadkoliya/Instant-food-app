const { loginGet, ragisterGet , sellerRagister ,sellerlogin  ,logout ,underConstrction, coomingSoon , forgetpass , verifymail , chackotp , changepaword} = require('../controller/authController');

const {loader} = require('../middleware/loader');
const router = require('express').Router();
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
module.exports = router; 