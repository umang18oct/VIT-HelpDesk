var express = require('express');
var router = express.Router();
var m = require("../middlewares")

router.get("/profile",m.authenticatedOnly,function(req,res,next){
  res.render("profile",{
    user : req.user,
    isAuthenticated : req.isAuthenticated()
  });
});

module.exports = router;
