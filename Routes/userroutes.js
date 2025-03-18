const { userLogin, userPage,userchack,userRagister,userRagisterdata ,userlogindata  , viewuserProducts,addcrat} = require('../controller/userController');

const router = require('express').Router();


router.get("/", userPage )
router.get("/userchack",userchack)
router.get("/userLogin",userLogin)
router.get("/userRagister",userRagister)
router.post('/userRagisterdata',userRagisterdata)
router.post('/userlogindata',userlogindata)
router.get('/viewuserProducts',viewuserProducts)
router.get('/addcrat',addcrat)
module.exports = router;