const { Post } = require("../model/author");

async function getPosts(req, res) {
  const posts = await Post.find();
  console.log(posts);
  const time = req.requestTime;
  return res.status(200).json({ time, posts });
}

async function getOnePost(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const time = req.requestTime;

    const post = await Post.findById(id);
    console.log(post);
    if (!post) {
      throw "Новость не найдена";
    }

    post.viewCount++;
    await post.save();

    // const updatedPost = await Post.findOneAndUpdate(
    //   { _id: id },
    //   { viewCount: post.viewCount + 1 },
    //   { new: true }
    // );

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
        dateOfCeated: newPost.dateOfCeated,
        title: newPost.title,
        content: newPost.content,
        commentary: newPost.commentary,
      },
      { new: true }
    );

    console.log(updatedPost);

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

module.exports = {
  getPosts,
  getOnePost,
  setOnePost,
};
