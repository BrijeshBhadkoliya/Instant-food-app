const { userLogin, userPage,userchack,userRagister,userRagisterdata ,userlogindata ,usergooglecallback } = require('../controller/userController');

const router = require('express').Router();


router.get("/", userPage )
router.get("/userchack",userchack)
router.get("/userLogin",userLogin)
router.get("/userRagister",userRagister)
router.post('/userRagisterdata',userRagisterdata)
router.post('/userlogindata',userlogindata)

module.exports = router;