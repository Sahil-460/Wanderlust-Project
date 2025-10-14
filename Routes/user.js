const express = require('express');
const router = express.Router({mergeParams:true});
const User = require("../model/user");
const passport = require("passport");
const flash = require("connect-flash");
const usercontroller = require("../controllers/users")
const {saveRedirectedUrl} = require("../middleware")
const wrapAsync = require("../utils/wrapAsync");

router.route("/signup")
.get((req,res)=>{
res.render("users/signup.ejs")
})
.post((usercontroller.newuser));

router.route("/login")
.get((req,res)=>{
res.render("users/login.ejs")
})
.post(saveRedirectedUrl,passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}),usercontroller.olduser)

//logout route
router.get("/logout",usercontroller.removeuser)

module.exports = router

