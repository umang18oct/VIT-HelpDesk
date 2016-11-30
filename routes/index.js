var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Complaint = require("../models/complaint");

var m = require("../middlewares");

var nodemailer = require("nodemailer")
var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'umang.chaudhary2015@vit.ac.in', // Your email id
            pass: '78654701' // Your password
        }
    });

/* GET home page. */
router.get('/', function (req, res) {
    res.render('cover', { user : req.user });
});

router.get('/login', function(req, res) {
    res.render('login_signup', { });
});

router.post('/register', function(req, res) {
    req.body.username = req.body.email;
    User.register(new User({ userType: req.body.userType, username : req.body.email,fname : req.body.fname, sex: req.body.sex,
      lname : req.body.lname, age : req.body.age, id : req.body.id, mobNo : req.body.mobNo, block : req.body.block, roomNo : req.body.roomNo,
      mess : req.body.mess, messType : req.body.messType }), req.body.password, function(err, user) {
        if (err) {
          console.log(err);
            return res.render('login_signup', { user : user });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/profile');
        });
    });
});

router.post('/login',function(req,res,next){
  req.body.username = req.body.email;
  next();
} ,passport.authenticate('local'), function(req, res) {
    res.redirect('/profile');
});

router.post('/complaint',m.authenticatedOnly, function(req, res) {
    User.find({
      block : req.user.block
    }).exec(function(err,users){
      if(err)throw err;
      users.forEach(function(user){
        if(user.userType!="Warden" && user.userType!="Mess")return;
        var mailOptions = {
            from: 'umang.chaudhary2015@vit.ac.in', // sender address
            to: 'umang18oct@gmail.com', // list of receivers
            subject: 'Complaint : '+req.body.complaintType, // Subject line
            text: req.body.description //, // plaintext body
            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                //res.json({yo: 'error'});
            }else{
                console.log('Message sent: ' + info.response);
                //res.json({yo: info.response});
            };
        });
      });
    })
    var complaint = new Complaint({
      complaintType: req.body.complaintType,
      description: req.body.description,
      date : new Date(),
      user : req.user
    });
    complaint.save(function(err){
      if(err){
        console.log("ERROR : ",err);
      }else{
        return res.redirect("/complaint");
      }
    });
});

router.post('/forum',m.authenticatedOnly, function(req, res) {
    var question = new Question({
      description: req.body.description,
      date : new Date(),
      tags: req.body.tags,
      answersCount: question.answers.length,
      user : req.user
    });
    question.save(function(err){
      if(err){
        console.log("ERROR : ",err);
      }
      else{
        return res.redirect("/forum");
      }
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get("/developers",function(req,res){
  res.render("developers");
});
router.get("/profile_warden",function(req,res){
  res.render("profile_warden");
});
router.get("/profile_mess",function(req,res){
  res.render("profile_mess");
});

router.get("/complaint",function(req,res){
  Complaint.find({user: req.user},function(err,complaints){
    if(err)throw err;
    res.render("complaint",{
      complaints : complaints
    });
  });
});
router.get("/profile",function(req,res){
  if(req.user.userType=="Mess"){
    Complaint.find({}).populate("user").exec(function(err,complaints){
      var newCom = [];
      complaints.forEach(function(com){
        if(com.complaintType=="Mess"){
          newCom.push(com);
        }
      })
      complaints = newCom;
      if(err)throw err;
      res.render("profile_mess",{
        complaints : complaints,
        user:req.user
      });
    });
  }
  else if(req.user.userType=="Warden"){
    Complaint.find({}).populate("user").exec(function(err,complaints){
      var newCom = [];
      complaints.forEach(function(com){
        if(com.user.block==req.user.block && com.complaintType!="Mess"){
          newCom.push(com);
        }
      });
      complaints = newCom;
      if(err)throw err;
      res.render("profile_warden",{
        complaints : complaints,
        user:req.user
      });
    });
  }
  else{
    Complaint.find({"user" : req.user}).populate("user").exec(function(err,complaints){
      if(err)throw err;
      res.render("profile",{
        complaints : complaints,
        user:req.user
      });
    });
  }
});

router.get("/forum",function(req,res){
  res.render("../public/webtech/mainforum");
});

module.exports = router;
