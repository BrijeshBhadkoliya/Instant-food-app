
const router = require('express').Router();

router.use('/', require('./authroutes'));
router.use('/sellerdaBord', require('./userRoutes'));
module.exports = router; 