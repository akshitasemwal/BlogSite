//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let posts = [];

app.get("/", function(req, res){
  res.render("index");
});

app.get("/blogs", function(req, res){
  res.render("blogs",{
    posts : posts
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post={                                  //3
    title : req.body.postTitle,
    content : req.body.postContent
  };
  posts.push(post);
  console.log(req.body);
  res.redirect("/blogs")                              //gets redirected to the page where blogs will be displayed
});

app.listen(3000, function(req, res){
  console.log("server started on channel 3000");
});

//make the frontend
//make the form
//make a post method to post values from html form and store in js object array
//push the const post into posts, which is then sent to /blogs. There a for loop goes through all the posts to print them as soon as a new post is added
