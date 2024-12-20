const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/nodekb");
let db = mongoose.connection;

// Check Connection
db.once("open", function () {
  console.log("Connected to MongoDB....");
});

// Check for db errors
db.on("error", function (err) {
  console.log(err);
});
// Init App
const app = express();

// Bring in DB Models
let Article = require("./models/article.js");
const { log } = require("util");

// Load View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Body Prcel Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, "public")));

// Home Route
app.get("/", async function (req, res) {
  let articles = {};
  try {
    articles = await Article.find();
  } catch (err) {
    console.log(err);
  }

  res.render("index", {
    title: "Article",
    articles: articles,
  });
});

// Get Single Article
app.get("/article/:id", function (req, res) {
  // Article.findById(req.params.id, function (err, article) {
  //   console.log(article);
  //   return;
  Article.findById(req.params.id)
    .then((article) => {
      res.render("article", {
        article: article,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Add Route
app.get("/articles/add", function (req, res) {
  res.render("add_article", {
    title: "Add Article",
  });
});

// Add Submit POST Route
app.post("/articles/add", function (req, res) {
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  // article.save(function (err) {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   } else {
  //     res.redirect("/");
  //   }
  // });

  article
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});
// Start Server
app.listen(3000, function () {
  console.log("SErver running on port 3000.....");
});
