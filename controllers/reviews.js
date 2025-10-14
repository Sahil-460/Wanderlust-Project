const Review = require("../model/review.js");
const Listing = require("../model/listing.js");

module.exports.postreview = async(req,res)=>{
try{let {id} = req.params;
let rev = await Listing.findById(id)
let newReview = new Review(req.body.review)
newReview.author = req.user._id;
console.log(newReview,rev)
await newReview.save();
await rev.reviews.push(newReview);
await rev.save();
req.flash("success","New review !")
res.redirect(`/listings/${id}`)}
catch(err){
console.log(err)
}};

module.exports.destroyreview = async(req,res)=>{
let {id,revid} = req.params;
const listing = await Listing.findByIdAndUpdate(id,{$pull:{reviews:revid}})
await Review.findByIdAndDelete(revid)
req.flash("success","Review deleted")
res.redirect(`/listings/${id}`)
}