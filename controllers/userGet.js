const { User } = require("../model/user");

async function getUsers(req, res) {
  const users = await User.find();
  console.log(users);
  return res.status(200).json({ users });
}

async function getOneUser(req, res) {
  try {
    const { id } = req.params;
    console.log(id);

    const user = await User.findById(id);
  
    if (!user) {
      throw "Пользователь не найден";
    }
    return res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
}

module.exports = {
  getUsers,
  getOneUser,
};
