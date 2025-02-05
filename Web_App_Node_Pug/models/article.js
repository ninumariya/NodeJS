const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
});

const Artcle = (module.exports = mongoose.model("Article", articleSchema));
