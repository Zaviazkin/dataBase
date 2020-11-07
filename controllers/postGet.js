const { Post, Counter } = require("../model/post");

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

async function getPosts(req, res) {
  try {
    const time = req.requestTime;

    const { start_date, end_date } = req.query;

    const filters = {};

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (startDate && endDate) {
      if (isValidDate(startDate)) {
        filters.$gt = new Date(startDate);
      }
      if (isValidDate(endDate)) {
        filters.$lt = new Date(endDate);
      }
      if (!isValidDate(endDate) || isValidDate(startDate)) {
        const posts = await Post.find();
        return res.status(200).json({ time, posts });
      }
      const posts = await Post.find({ updatedAt: filters });
      if (!posts.length) {
        return res.status(404).json(`Новостей нет , ${time}`);
      }
      return res.status(200).json({ time, posts });
    }
  } catch (e) {
    res.status(400).json(e);
    console.log(e.message);
  }
}

async function getOnePost(req, res) {
  try {
    const { id } = req.params;

    const time = req.requestTime;

    const post = await Post.findById(id)
      .populate("vieCounter")
      .populate("commentary");

    if (!post) {
      throw "Новость не найдена";
    }
    await Counter.findByIdAndUpdate(
      { _id: post.vieCounter._id },
      { vieCounter: post.vieCounter.vieCounter + 1 }
    );
    return res.status(200).json({ time, post });
  } catch (e) {
    res.status(400).json(e);
  }
}

async function setOnePost(req, res) {
  try {
    const { id } = req.params;

    const time = req.requestTime;

    const newPost = req.body;

    const updatedPost = await Post.findOneAndUpdate(
      { _id: id },
      {
        author: newPost.author,
        title: newPost.title,
        content: newPost.content,
      },
      { new: true }
    );

    if (!updatedPost) {
      throw "Новость не найдена";
    }

    return res
      .status(200)
      .json({ time, message: "Новость успешно изменена", updatedPost });
  } catch (e) {
    res.status(400).json(e);
  }
}

async function findOnePostDelete(req, res) {
  try {
    const { id } = req.params;

    const time = req.requestTime;

    const deletedPost = await Post.findById(id);

    if (!deletedPost) {
      throw "Новость не найдена";
    }
    deletedPost.deleteOne();
    return res.status(200).json({ time, message: "Новость успешно удалена" });
  } catch (e) {
    res.status(400).json(e);
  }
}

module.exports = {
  getPosts,
  getOnePost,
  setOnePost,
  findOnePostDelete,
};
