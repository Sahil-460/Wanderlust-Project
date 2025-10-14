const Listing = require("./model/listing")
const ExpressError = require("./utils/ExpressError");
const listingschema = require("./model/listing");
const reviewschema = require("./model/review");
const Review = require("./model/review");

module.exports.isloggedin = (req,res,next)=>{// it is  a way to write a function when we want to export many functions
 console.log(req.user)
  if(!req.isAuthenticated()){
    req.session.redirectUrl = req.originalUrl;
  req.flash("error","You must be logged in to Wanderlust");
  return res.redirect("/login")// we used return so code dont move further..
}else{
next()
}
}
module.exports.saveRedirectedUrl = (req,res,next)=>{
if(req.session.redirectUrl){
  res.locals.redirectUrl = req.session.redirectUrl;
}
next()
}

module.exports.isowner= async(req,res,next)=>{
  let {id:newid} = req.params;
let listing = await Listing.findById(newid);
if(!listing.owner._id.equals(res.locals.curruser._id)){//.equals is used to compare ids 
  req.flash("error","You dont have access to it")
  return res.redirect(`/listings/${newid}`)}
  else{
    next()
  }
}

module.exports.validateListing = (req,res,next) =>{
let {error} = listingschema.validate(req.body);
  if(error){
 let errormsg = error.details.map((el)=>el.message).join(",")
    throw new ExpressError(400,errormsg)
  }else{
    next()
  }
}

module.exports.validateReview = (req,res,next) =>{
let {error} =   reviewschema.validate(req.body);
  if(error){
 let errormsg = error.details.map((el)=>el.message).join(",")
    throw new ExpressError(400,errormsg)
  }else{
    next()
  }
}

module.exports.isreviewauthor = async(req,res,next)=>{
let {id,revid} = req.params;
const review = await Review.findById(revid);
if(!review.author.equals(res.locals.curruser._id)){
 req.flash("error","You are not the owner of this review")
 res.redirect(`/listings/${id}`)
}else{
  next()
}
}