const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors');

const { router } = require("./routes/routes");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", router);

const PORT = process.env.PORT || 5050;

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
    console.log("Hello epta");
  }
}

startApp();
