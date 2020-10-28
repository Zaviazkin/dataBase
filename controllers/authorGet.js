const { Author } = require("../model/author");

async function getAuthors(req, res) {
  const authors = await Author.find();
  console.log(authors);
  return res.status(200).json({ authors });
}

module.exports = {
  getAuthors, 
};
