var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('partials/users');
});

router.post('/register', async function(req, res, next) {
  let user = new User(req.body);
  await user.save()
  res.redirect('/');
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('partials/login');
});
/* GET logout page. */
router.get('/logout', function(req, res, next) {
  req.session.userz = null;
  res.redirect('/users/login');
});

router.post('/login', async function(req, res, next) {
  let user = await User.findOne({email:req.body.email,password:req.body.password});
  if(!user) return res.redirect('/users/login');
  req.session.userz = user;
  return res.redirect('/blogs');
});


module.exports = router;