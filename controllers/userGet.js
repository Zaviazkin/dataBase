const { User } = require("../model/user");

async function getUsers(req, res) {
  const users = await User.find();
  console.log(users);
  const time = req.requestTime;
  return res.status(200).json({ time, users });
}

async function getOneUser(req, res) {
  try {
    const { id } = req.params;
    const time = req.requestTime;

    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      throw "Пользователь не найден";
    }
    return res.status(200).json({ time, user });
  } catch (e) {
    res.status(400).json(e);
  }
}

module.exports = {
  getUsers,
  getOneUser,
};
