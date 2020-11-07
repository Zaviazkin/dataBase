const { Post, Comment } = require("../model/post");
const mongoose = require("mongoose");

async function setOneComment(req, res) {
  try {
    const { postId } = req.params;

    const time = req.requestTime;

    const { user, comment } = req.body;

    const post = await Post.findById(postId).populate("commentary");

    if (!post) {
      throw "Новость не найдена";
    }
    const commento = await Comment.create({
      _id: new mongoose.Types.ObjectId(),
      user: user,
      comment: comment,
    });

    post.commentary.push(commento);

    post.save();

    return res
      .status(200)
      .json({ time, message: "Комментарий успешно добавлен", post });
  } catch (e) {
    res.status(400).json(e.message);
  }
}

module.exports = {
  setOneComment,
};
