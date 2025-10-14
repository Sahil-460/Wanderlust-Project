const Listing = require("../model/listing")
module.exports.index = async (req,res)=>{
   let allListings =   await Listing.find()
res.render("listings/index.ejs",{allListings})
};

module.exports.rendernewform = async(req,res)=>{
let {title:newtitle,description:newdescription,image:newimage,price:newprice,location:newlocation,country:newcountry,category:newcategory} =  req.body;
const list1 = new Listing({
title:newtitle,
description:newdescription,
image:newimage,
price:newprice,
location:newlocation,
country:newcountry,
category:newcategory
})
list1.owner = req.user._id;
list1.image.url = req.file.path
list1.image.filename = req.file.filename;
 await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(list1.location)}`)
 .then(response => response.json())
        .then(data => {
          if(data.length === 0) return alert('Location not found');
          
          var lat = data[0].lat;
          var lon = data[0].lon;
        list1.latitude = lat;
        list1.longitude = lon;
      });
await list1.save();
req.flash("success","New listing created")
res.redirect("/listings")}

module.exports.showlistings = async(req,res)=>{
let {id} = req.params;
const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner")// nested populate
if(!listing){
  req.flash("error","Listing does not exists")
  return res.redirect("/listings")// we used return because function was executing further and express cannot send 2 responses returned a value to function
}
console.log(listing)
res.render("listings/show.ejs",{listing})
}

module.exports.editlistings = async (req,res)=>{
let {id} = req.params;
let listing = await Listing.findById(id)
let imageUrl = listing.image.url;
let newimageUrl = imageUrl.replace("/upload","/upload/h_300,w_400") 
req.flash("success","Listing Edited")
if(!listing){
  req.flash("error","Listing you requested for does not exist")
  return res.redirect("/listings")
}
res.render("listings/update.ejs",{listing,newimageUrl})
}

module.exports.updatelistings = async (req,res)=>{
let {title:newtitle,description:newdescription,price:newprice,location:newlocation,country:newcountry} =  req.body;
let{id:newid} = req.params;
let listing = await Listing.findByIdAndUpdate(newid,{
    title:newtitle,
    description:newdescription,
    price:newprice,
    location:newlocation,
    country:newcountry
})
if(typeof req.file !=="undefined"){
  listing.image.url= req.file.path,
  listing.image.filename = req.file.filename
}
listing.save()
req.flash("success","Listing Updated")
res.redirect(`/listings/${newid}`)
}

module.exports.destroylisting = async (req,res)=>{
let{id:newid} = req.params;
await Listing.findByIdAndDelete(newid)
req.flash("success","Listing deleted")
res.redirect("/listings")
}







