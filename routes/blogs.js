var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');
var checkSessionAuth = require('../middlewares/checkSessionAuth')
/* GET home page. */
router.get('/', async function(req, res, next) {
    let blogs = await Blog.find();
    //console.log(req.session.user);
    // console.log(blogs)
    res.render('partials/list', {blogs});
  });

//add page
router.get('/add', function(req, res, next) {
    res.render('partials/add');
  });
//adds in db
router.post('/add', async function(req, res, next) {
  let blog = new Blog(req.body)
  await blog.save();
  res.redirect("/blogs");
  });

//deletes in db
router.get('/delete/:id', async function(req, res, next) {
  let blog = await Blog.findByIdAndDelete(req.params.id)
  res.redirect("/blogs");
});

//edit 
router.get('/edit/:id', async function(req, res, next) {
  let blog = await Blog.findById(req.params.id)
  res.render('partials/edit',{blog});
  });
//edit post 
router.post('/edit/:id', async function(req, res, next) {
  let blog = await Blog.findById(req.params.id)
  blog.title = req.body.title;
  blog.body = req.body.body;
  await blog.save();
  res.redirect("/blogs");
  });

  /* GET read later page */
router.get('/readlater', function(req, res, next) {
  let readlater = req.cookies.readlater;
  if(!readlater) readlater=[];
  res.render('readlater',{readlater});
});

//adds in read later
router.get('/readlater/:id', async function(req, res, next) {
  let blog = await Blog.findById(req.params.id)
  //console.log(req.cookies.readlater._id);
  let readlater = [];
  if(req.cookies.readlater) readlater = req.cookies.readlater;
  if(readlater === blog) readlater = readlater;
  else (readlater.push(blog));
  res.cookie("readlater",readlater);
  res.redirect("/blogs");
});   
//removes from read later
router.get('/readlater/remove/:id', async function(req, res, next) {
  let readlater = [];
  if(req.cookies.readlater) readlater = req.cookies.readlater;
  readlater.splice((c)=>(c._id == req.params.id),1);
  res.cookie("readlater",readlater);
  res.redirect("/blogs/readlater");
});

module.exports = router;