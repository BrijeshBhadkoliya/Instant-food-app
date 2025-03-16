const {sellerdaBord} = require('../controller/authController');

const {loader} = require('../middleware/loader');
const router = require('express').Router();

router.get('/',sellerdaBord);
 



module.exports = router; 