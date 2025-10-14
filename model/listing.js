const mongoose = require('mongoose');
const Review = require("./review")
const listingschema = new mongoose.Schema({
title:{
    type:String,required:true
},
description:{
type:String
},
image:{
 url:{type:String},
 filename:{type:String}
},
price:{
    type:Number
},
location:{
    type:String
},
country:{
    type:String
},
reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Review"
}],
owner:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},
latitude :{
    type:Number
},
longitude:{
    type:Number
},
category:{
 type:String,
 enum:["Rooms","Iconic cities","Mountains","Cabins","Farms","Beaches","Surfing","Amazing pools","Boats","Arctic","Camping"]
}
}
)

listingschema.post("findOneAndDelete",async(listing)=>{
 if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}})
 }
})

const Listing = mongoose.model("Listing",listingschema)

// listing schema
module.exports = Listing