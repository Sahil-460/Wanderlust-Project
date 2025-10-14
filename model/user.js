const { required } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
// .then(()=>{
// console.log("connected successful")
// })
// .catch(()=>{
// console.log("cannot connect")
// })
const userSchema = new Schema({
email:{
type:String
,required:true}
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);


