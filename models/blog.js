var mongoose = require("mongoose");

var blogSchema = mongoose.Schema({
  title: String,
  body: String,
});
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;