function sessionAuth(req,res,next){
    res.locals.user = req.session.userz;
    next();
}
module.exports = sessionAuth;