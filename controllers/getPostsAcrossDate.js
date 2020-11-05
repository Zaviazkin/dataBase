const { Post } = require("../model/post");

async function getPostsAcrossDate(req, res) {
  try {
    const time = req.requestTime;

    const date = req.body;

    const startDate = date.startDate.split(".").reverse().join(",");
    const endDate = date.endDate.split(".").reverse().join(",");

    const dateStart = new Date(startDate);
    const dateEnd = new Date(endDate);
    console.log(dateStart);
    console.log(dateEnd);
    if (date.startDate.slice(0, 2) > 31 || date.endDate.slice(0, 2) > 31) {
      throw "Неверно указаны дни";
    }
    if (date.startDate.slice(2, 5) > 11 || date.endDate.slice(2, 5) > 11) {
      throw "Неверно указан месяц";
    }
    if (
      date.startDate.slice(5, 10) > 2000 ||
      date.endDate.slice(5, 10) > 2021
    ) {
      throw "Неверно указан год";
    }
    const posts = await Post.find({
      updatedAt: { $gt: startDate, $lt: endDate },
    });

    if (posts) {
      return res.status(200).json({ time, posts });
    }
    if (!posts) {
      throw "Новости не найдены";
    }
  } catch (e) {
    res.status(400).json(e.message);
    console.log(e);
  }
}

module.exports = {
  getPostsAcrossDate,
};
