const mongoose = require('mongoose');
const initdata = require('./data')
const Listing = require('../model/listing')
 

async function main(){
await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
}

main()
.then(()=>{
    console.log("Connection successful")
})

const initDB = async () =>{
await Listing.deleteMany({})
initdata.data = initdata.data.map((obj)=>({...obj,owner:"68e4d2efa593921a8a41c331"}))//The parentheses tell JavaScript: "The whole thing inside is an object expression to be returned."
await Listing.insertMany(initdata.data)
console.log("data was intialised")
}

initDB();











