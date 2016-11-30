var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
    userType: {
      type : String,
      enum : ["Student","Warden","Mess"]
    },
    email: String,
    password: String,
    fname : String,
    lname : String,
    age: Number,
    id : String,
   	sex : ['M','F'],
    block: String,
    messType: String,
    mess: String,
    roomNo: Number,
    mobNo: Number
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
