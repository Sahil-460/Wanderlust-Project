const express = require('express');

const router = express.Router({mergeParams:true});

const wrapAsync = require("../utils/wrapAsync");

const Review = require("../model/review.js")

const flash = require("connect-flash")

const {validateReview,isloggedin,isreviewauthor} = require("../middleware.js")

const ExpressError = require("../utils/ExpressError.js");

const Listing = require('../model/listing');

const Joi = require('joi')

const reviewschema = require("../schema.js"); 

const reviewcontroller = require("../controllers/reviews.js")

//reviews
//post route
router.post("/",isloggedin,validateReview,wrapAsync(reviewcontroller.postreview));

//delete review route
router.delete("/:revid",isloggedin,isreviewauthor,wrapAsync(reviewcontroller.destroyreview))

module.exports = router

