const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/authorization");
const { registerAuthor } = require("../controllers/authorAuthorization");

const { getUsers, getOneUser } = require("../controllers/userGet");
const { getAuthors } = require("../controllers/authorGet");


router.get('/user/:id', getOneUser)



router.post("/api/register-user", registerUser);
router.post("/api/register-author", registerAuthor);

router.get("/users", getUsers);
router.get("/authors", getAuthors);

module.exports = {
  router,
};
