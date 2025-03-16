
const router = require('express').Router();

router.use('/', require('./authroutes'));
router.use('/sellerdaBord', require('./sellerRoutes'));
router.use("/user", require("./userroutes"))
module.exports = router; 