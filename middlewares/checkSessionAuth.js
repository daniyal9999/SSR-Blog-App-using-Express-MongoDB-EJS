function checkSessionAuth(req,res,next){
   if(req.session.userz) next();
   else return res.redirect('/users/login') 
}
module.exports = checkSessionAuth;