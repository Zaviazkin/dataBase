const express = require("express");
const app = express();
require("dotenv").config();
const {registerUser} = require('./controllers/authorization')

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 5050;

const {getUsers} = require('./controllers/userGet')


app.post('/api/register-user', registerUser)

app.get('/api/users', getUsers)

async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`APP STARTED ON ${PORT} PORT`);
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  } finally {
    console.log('Hello epta');
  }
}

startApp();
