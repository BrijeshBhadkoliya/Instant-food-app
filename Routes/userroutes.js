const { userlogin } = require('../controller/userController');

const router = require('express').Router();


router.get("/", userlogin )
module.exports = router; 