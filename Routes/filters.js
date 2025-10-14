const express = require('express');

const Listing = require("../model/listing")

const router = express.Router();

router.get("/trending",async(req,res)=>{
 const listings = await Listing.find({})
 if(listings.length==0){
    req.flash("error","OOPS ! No listing available now for the trending category")
    res.redirect("/listings")
 }else{
res.render("filter.ejs",{listings})
 }
});
router.get("/rooms",async(req,res)=>{
 const listings = await Listing.find({category:"Rooms"})
 if(listings.length==0){
    req.flash("error","OOPS ! No listing available right now for the Room category")
    res.redirect("/listings")
 }else{
res.render("filter.ejs",{listings})
 }
});
router.get("/iconiccities",async(req,res)=>{
 const listings = await Listing.find({category:"Iconic cities"})
 if(listings.length==0){
    req.flash("error","OOPS ! No listing available right now for the Iconic Cities category")
    res.redirect("/listings")
 }else{
res.render("filter.ejs",{listings})
 }
});
router.get("/mountains",async(req,res)=>{
 const listings = await Listing.find({category:"Mountains"})
 if(listings.length==0){
    req.flash("error","OOPS ! No listing available right now for the Mountains category")
    res.redirect("/listings")
 }else{
res.render("filter.ejs",{listings})
 }
});
router.get("/cabins",async(req,res)=>{
 const listings = await Listing.find({category:"Cabins"})
 if(listings.length==0){
    req.flash("error","OOPS ! No listing available right now for the Cabins category")
    res.redirect("/listings")
 }else{
res.render("filter.ejs",{listings})
 }
});
router.get("/farms",async(req,res)=>{
 const listings = await Listing.find({category:"Farms"})
 if(listings.length==0){
    req.flash("error","OOPS ! No listing available right now for the Farms category")
    res.redirect("/listings")
 }else{
res.render("filter.ejs",{listings})
 }
});
router.get("/beaches",async(req,res)=>{
 const listings = await Listing.find({category:"Beaches"})
 if(listings.length==0){
    req.flash("error","OOPS ! No listing available right now for the Beaches category")
    res.redirect("/listings")
 }else{
res.render("filter.ejs",{listings})
 }
});
router.get("/surfing",async(req,res)=>{
 const listings = await Listing.find({category:"Surfing"})
 if(listings.length==0){
    req.flash("error","OOPS ! No listing available right now for the Surfing category")
    res.redirect("/listings")
 }else{
res.render("filter.ejs",{listings})
 }
});
router.get("/amazingpools",async(req,res)=>{
 const listings = await Listing.find({category:"Amazing pools"})
 if(listings.length==0){
    req.flash("error","OOPS ! No listing available right now for the Amazing pools category")
    res.redirect("/listings")
 }else{
res.render("filter.ejs",{listings})
 }
});
router.get("/boats",async(req,res)=>{
 const listings = await Listing.find({category:"Boats"})
 if(listings.length==0){
    req.flash("error","OOPS ! No listing available right now for the Boats category")
    res.redirect("/listings")
 }else{
res.render("filter.ejs",{listings})
 }
});
router.get("/arctic",async(req,res)=>{
 const listings = await Listing.find({category:"Arctic"})
 if(listings.length==0){
    req.flash("error","OOPS ! No listing available right now for the Arctic category")
    res.redirect("/listings")
 }else{
res.render("filter.ejs",{listings})
 }
});
router.get("/camping",async(req,res)=>{
 const listings = await Listing.find({category:"Camping"})
 if(listings.length==0){
    req.flash("error","OOPS ! No listing available right now for the Camping category")
    res.redirect("/listings")
 }else{
res.render("filter.ejs",{listings})
 }
});
module.exports =router;