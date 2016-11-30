var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Reply = new Schema({
    replyDescription: String,
    replyDate: { type: Date, default: Date.now },
    userID :{
        type :mongoose.Schema.ObjectId,
        ref : "User"
      },
    complaintID :{
          type :mongoose.Schema.ObjectId,
          ref : "Complaint"
    }
});
Complaint.plugin(passportLocalMongoose);
module.exports = mongoose.model('Reply', Reply);
