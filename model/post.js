const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    author: {
      type: String,
      default: " ",
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
    commentary: {
      type: String,
    },
    vieCounter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "counter",
    },
  },
  { timestamps: true }
);

const newsCounterSchema = new Schema({
  vieCounter: { type: Number, default: 0 },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

const Counter = mongoose.model("counter", newsCounterSchema);
const Post = mongoose.model("post", postSchema);

module.exports = {
  Post,
  Counter,
};
