const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = new schema({
  author: {
    type: String,
    default: " ",
    required: true,
  },
  dateOfCeated: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  commentary: {
    type: String,
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = {
  Post,
};
