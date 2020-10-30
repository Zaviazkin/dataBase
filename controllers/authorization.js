const { User } = require("../model/user");

async function registerUser(req, res) {
  const time = req.requestTime;
  const { surname, email, password, passwordRepeat, lastname } = req.body;
  if (surname.trim() === "") {
    return res
      .status(400)
      .json({ message: "Неправильно заполнено поле surname" });
  }
  if (lastname.trim() === "") {
    return res
      .status(400)
      .json({ message: "Неправильно заполнено поле lastname" });
  }
  if (password.trim() === "") {
    if (passwordRepeat.trim() !== password.trim()) {
      return res
        .status(400)
        .json({ message: "Поле password и passwordRepeat не совпадают" });
    }
    return res
      .status(400)
      .json({ message: "Неправильно заполнено поле password" });
  }
  if (
    email.trim() === "" ||
    email.trim().indexOf("@") === -1 ||
    email.trim().indexOf(".") === -1
  ) {
    return res
      .status(400)
      .json({ message: "Неправильно заполнено поле email" });
  }
  if (
    surname &&
    lastname &&
    password.trim() === passwordRepeat.trim() &&
    email
  ) {
    console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким email уже существует" });
    }

    const user = await User.create({
      surname: surname,
      lastname: lastname,
      password: password,
      passwordRepeat: passwordRepeat,
      email: email,
    });
    return res
      .status(200)
      .json({ time, message: "Пользователь успешно сохранен", user: user });
  } else {
    return res.status(400).json({ message: "Неправильно заполнены поля" });
  }
}

// async function Login(req, res) {
//     // в req.body email, password
//     // email и пороль
// }
module.exports = {
  registerUser,
};
