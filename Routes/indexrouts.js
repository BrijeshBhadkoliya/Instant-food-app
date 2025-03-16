
const router = require('express').Router();

router.use('/', require('./authroutes'));
router.use('/sellerdaBord', require('./sellerRoutes'));
module.exports = router; 