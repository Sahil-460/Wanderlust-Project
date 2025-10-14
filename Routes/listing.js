const express = require('express');

const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");

const {validateListing} = require("../middleware.js");

const listingschema = require("../model/listing.js");

const {storage} = require("../cloudConfig.js")

const multer  = require('multer');

const upload = multer({storage})

const {isloggedin,isowner} = require("../middleware.js")// way to acquire when there are multiple functions

const Joi = require('joi');

const Listing = require('../model/listing');

const ExpressError = require("../utils/ExpressError.js");

const controller = require("../controllers/listings.js")

router.route("/")
.get(wrapAsync(controller.index))
.post(isloggedin,upload.single('image'),validateListing,wrapAsync(controller.rendernewform))

//new route
router.get("/new",isloggedin,(req,res)=>{
res.render("new.ejs")
});

router.route("/:id")
.get(wrapAsync(controller.showlistings))
.put(isloggedin,isowner,upload.single("image"),validateListing,wrapAsync(controller.updatelistings))
.delete(isloggedin,isowner,wrapAsync(controller.destroylisting));

//edit route
router.get("/:id/edit",isloggedin,isowner,wrapAsync(controller.editlistings))

module.exports = router