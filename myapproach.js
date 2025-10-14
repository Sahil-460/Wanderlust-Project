const express = require('express');
const router = express.Router({mergeParams:true});
router.use((req,res,next)=>{
if(!req.isAuthenticated()){
  req.flash("error","You must be logged in to Wanderlust");
  return res.redirect("/login")// we used return so code dont move further to render..
}else{
next()
}
})
module.exports = router










