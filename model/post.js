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

    vieCounter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "counter",
    },
    commentary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
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

const commentSchema = new Schema({
  user: { type: String, default: " " },
  comment: { type: String, default: " " },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  dateofCreated: { type: Date, required: true, default: Date.now },
});

const Counter = mongoose.model("counter", newsCounterSchema);
const Post = mongoose.model("post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = {
  Post,
  Counter,
  Comment,
};
