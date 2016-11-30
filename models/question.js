var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Question = new Schema({
    description: String,
    tags: [{
      type : String,
      enum : ["technology","academics","sports","entertainment","miscellaneous"]
    }],
    date: { type: Date, default: Date.now },
    answersCount: {
      type : Number,
      default : 0
    },
    user :{
        type :mongoose.Schema.ObjectId,
        ref : "User"
      },
    answers : [{
      content : String,
      date : {type : Date,default : Date.now},
      upVotes : {type : Number, default : 0},
      downVotes : {type : Number, default : 0},
      user : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
      }
    }]
});
module.exports = mongoose.model('Question', Question);
