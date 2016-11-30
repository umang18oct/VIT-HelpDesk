var $ = module.exports;

$.authenticatedOnly = function(req,res,next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect("/login");
  }
}
