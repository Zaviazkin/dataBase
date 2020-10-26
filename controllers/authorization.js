const {User} = require('../model/user')

async function registerUser(req, res) {
    const {name, email, password} = req.body;
    if (name && password && email) {
    console.log(req.body);
    const existingUser = await User.findOne({email})
    if(existingUser) {
        return res.status(400).json({message : 'Пользователь с таким email уже существует'})
    }

    const user = await User.create({
        name : name,
        password : password,
        email : email,
        })
return res.status(200).json({message : 'Пользователь успешно сохранен',
user : user})
    }
    if(name.trim() === '') {
        return res.status(400).json({message : 'Неправильно заполнено поле name'})
    }
    if(password.trim() === '') {
        return res.status(400).json({message : 'Неправильно заполнено поле password'})
    }
    if(email.trim() === '') {
        return res.status(400).json({message : 'Неправильно заполнено поле email'})
    }
    else {
        return res.status(400).json({message : 'Неправильно заполнены поля'})
    }



}
module.exports = {
    registerUser
}