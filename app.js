if(process.env.NODE_ENV !="production"){
require('dotenv').config()
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
var flash = require('connect-flash');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
const user = require("./Routes/user.js")
const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user.js")

const dbURL = process.env.ATLASDB_URL

const store = MongoStore.create({
mongoUrl:dbURL,
crypto:{secret:process.env.SECRET},
touchAfter:24*60*60
});

const sessionOptions = {
store:store,
secret:process.env.SECRET,
resave:false,
saveUninitialized:true,
cookie:{
    expires:Date.now() + 7 * 24 * 60 *60 * 1000,
    maxAge: 7 * 24 * 60 *60 * 1000
}
}
app.use(session(sessionOptions))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
var methodOverride = require('method-override');

const listings = require("./Routes/listing.js")

const Joi = require('joi');

const review = require("./Routes/review.js")

app.use(methodOverride('_method'));

const ejsMate =  require("ejs-mate");

app.engine("ejs",ejsMate);

const filters = require("./Routes/filters.js")

app.use(express.urlencoded({extended:true}));

const Listing = require("./model/listing.js")

const path = require('path')

app.use(express.static(path.join(__dirname,"/public")))

app.set("view engine","ejs")

const ExpressError = require("./utils/ExpressError.js")

 main()
.then(()=>{
    console.log("Connection successful")
})

app.set("views",path.join(__dirname,"/views"))

async function main(){
await mongoose.connect(dbURL)
}


app.listen(8080,()=>{
console.log("Listening to port 8080")
})

app.use((req,res,next)=>{
res.locals.success =  req.flash("success");
res.locals.error =  req.flash("error");
res.locals.curruser = req.user;
next();
})

app.get("/",(req,res)=>[
res.redirect("/listings")
])

app.get("/searchlistings",async(req,res)=>{
let {searchcountry:Country} =req.query;
const listings = await Listing.find({country:Country})
if(listings.length==0){
    req.flash("error",`OOPS ! No listing is being listed in ${Country}`)
    res.redirect("/listings")
}else{
res.render("countrysearch.ejs",{listings})}
})

// app.get("/demouser",async(req,res)=>{
// const fakeUser = new User({
// email:"abc@gmail.com",
// username:"abcd"
// })
//   const registeredUser =  await User.register(fakeUser,"helloworld")
//  res.send(registeredUser)
// })

app.use("/listings",listings);

app.use("/listings/:id/reviews",review)

app.use("/",user)

app.use("/filters",filters)

app.all(/.*/,(req,res,next)=>{
next(new ExpressError(404,"Page not found !!"))
})

app.use((err,req,res,next)=>{
    let{statusCode=500,message="Something went wrong"} = err;
res.status(statusCode).render("error.ejs",{err})
})
