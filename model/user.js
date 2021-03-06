const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  surname: {
    type: String,
    default: " ",
  },
  lastname: {
    type: String,
    default: " ",
  },
  password: {
    type: String,
    required: true,
  },
  passwordRepeat: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = {
  User,
};
