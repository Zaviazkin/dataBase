const mongoose = require("mongoose");
const schema = mongoose.Schema;

const authorSchema = new schema({
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
  commentary: {
    type: String,
  },
});

const Author = mongoose.model("author", authorSchema);

module.exports = {
    Author,
};
