var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Answer = new Schema({
    description: String,
    question :{
      type:mongoose.Schema.ObjectId,
      ref: "Question"
    }
    date: { type: Date, default: Date.now },
    user :{
        type :mongoose.Schema.ObjectId,
        ref : "User"
      },
    upvote: Number,
    downvote: Number
});
module.exports = mongoose.model('Answer', Answer);
