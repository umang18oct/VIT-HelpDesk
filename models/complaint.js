var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Complaint = new Schema({
    description: String,
    date: { type: Date, default: Date.now },
    user :{
        type :mongoose.Schema.ObjectId,
        ref : "User"
      },
      complaintType : {
        type : String,
        enum : ["mess","electricity","furniture","personal","indiscipline","abuse"]
      }
});
module.exports = mongoose.model('Complaint', Complaint);
