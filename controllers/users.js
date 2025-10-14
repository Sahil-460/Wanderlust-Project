const User = require("../model/user")
module.exports.newuser = async(req,res)=>{
try{let{username,Email,password} = req.body;
let newUser = new User({
email:Email,
username:username
})
 let newuser = await User.register(newUser,password)  
console.log(newuser);
req.login(newuser,(err,next)=>{
if(err){
    next(err)}
 req.flash("success",`Welcome ${username} To Wanderlust !!`)
 res.redirect("/listings") 
})
}catch(err){
req.flash("error",err.message)
res.redirect("/signup")
}}

module.exports.olduser = async(req,res)=>{
req.flash("success","Welcome back to Wanderlust")
let redirectUrl = res.locals.redirectUrl || "/listings" // store value of res.locals.redirect in redirectUrl if available otherwise store /listings
res.redirect(redirectUrl)// passport after login clears the whole session , so we used res.locals
}

module.exports.removeuser = (req,res)=>{
req.logout((err,next)=>{
if(err){
return next(err)
}else{
req.flash("success","You are successfully logged out")
res.redirect("/listings")
}
})
}