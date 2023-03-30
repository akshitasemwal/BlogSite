//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://127.0.0.1:27017/blogSiteDB", {useNewUrlParser: true})
.then(()=>{
  console.log("connection successful!");
});

const postSchema = {     //schema
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);     //model

app.get("/", function(req, res){
  res.render("index");
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({                            //object
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save().then((post) => {
    res.redirect('posts');
  }).catch((err) => {
    console.error(err);
  });
});

app.get("/posts", function(req, res){
  Post.find({}).then(posts => {
    res.render("posts", {
      posts: posts
      });
  });
});

app.get("/posts/:postId", function(req, res){
const requestedPostId = req.params.postId;

Post.findOne({_id: requestedPostId}).then(post =>{
  res.render("post", {
    title: post.title,
    content: post.content,
    _id: requestedPostId
    });
  });

});

// app.patch("/posts/:postId", function(req, res){
//   const requestedPostId = req.params.postId;
//   Post.findByIdAndUpdate(requestedPostId, req.body, {new: true}).then(post)=>{
//     if(!blog)
//     {
//       alert("error");
//     }
//     else {
//       res.send(post);
//     }
//   }
// });

app.delete("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;
  Post.findByIdAndDelete(requestedPostId, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.redirect('posts');
    }
  });
});

app.listen(3000, function(req, res){
  console.log("server started on channel 3000");
});

//make the frontend
//make the form
//make a post method to post values from html form and store in js object array
//push the const post into posts, which is then sent to /blogs. There a for loop goes through all the posts to print them as soon as a new post is added

//connect to mongoose
//define the schema
//mongod
//
