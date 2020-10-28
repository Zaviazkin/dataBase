const { Author } = require("../model/author");

async function registerAuthor(req, res) {
  const { author, dateOfCeated, title, content, commentary } = req.body;
  if (author.trim() === "") {
    return res
      .status(400)
      .json({ message: "Неправильно заполнено поле author" });
  }
  if (dateOfCeated.trim() === "") {
    return res
      .status(400)
      .json({ message: "Неправильно заполнено поле dateOfCeated" });
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
  if (author && dateOfCeated && title && content) {
    console.log(req.body);
    const existingAuthor = await Author.findOne({ title });
    if (existingAuthor) {
      return res
        .status(400)
        .json({ message: "Новость с таким заголовком уже существует" });
    }

    const authorr = await Author.create({
      author: author,
      dateOfCeated: dateOfCeated,
      title: title,
      content: content,
      commentary: commentary,
    });
    return res
      .status(200)
      .json({ message: "Новость успешно сохранена", author: authorr });
  } else {
    return res.status(400).json({ message: "Неправильно заполнены поля" });
  }
}
module.exports = {
  registerAuthor,
};
