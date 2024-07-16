const express = require("express");
const { registerUser ,loginUser} = require("../controller/user.controller");
const {userRegistrationValidation,loginValidation} =require("../validation/user.validation")

const router = express.Router();

router.post("/register",userRegistrationValidation,registerUser);
router.post("/login",loginValidation,loginUser);

module.exports = router;
