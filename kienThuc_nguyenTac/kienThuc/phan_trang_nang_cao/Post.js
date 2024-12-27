const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

// Tạo 
postSchema.plugin(mongoosePaginate);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

