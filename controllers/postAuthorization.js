const { Post, Counter } = require("../model/post");
const mongoose = require("mongoose");

async function registerAuthor(req, res) {
  const time = req.requestTime;
  const { author, title, content, commentary } = req.body;
  if (author.trim() === "") {
    return res
      .status(400)
      .json({ message: "Неправильно заполнено поле author" });
  }
  if (title.trim() === "") {
    return res
      .status(400)
      .json({ message: "Неправильно заполнено поле title" });
  }
  if (content.trim() === "") {
    return res
      .status(400)
      .json({ message: "Неправильно заполнено поле content" });
  }
  if (author && title && content) {
    console.log(req.body);
    const existingAuthor = await Post.findOne({ title });
    if (existingAuthor) {
      return res
        .status(400)
        .json({ message: "Новость с таким заголовком уже существует" });
    }

    const counter = await Counter.create({
      _id: new mongoose.Types.ObjectId(),
      vieCounter: 0,
    });

    const authorr = await Post.create({
      _id: new mongoose.Types.ObjectId(),
      author: author,
      title: title,
      content: content,
      commentary: commentary,
      vieCounter: counter._id,
    });

    authorr.createdAt;
    authorr.updatedAt;

    return res
      .status(200)
      .json({ time, message: "Новость успешно сохранена", author: authorr });
  } else {
    return res.status(400).json({ message: "Неправильно заполнены поля" });
  }
}
module.exports = {
  registerAuthor,
};
