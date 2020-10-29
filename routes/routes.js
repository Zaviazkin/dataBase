const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/authorization");
const { registerAuthor } = require("../controllers/authorAuthorization");

const { getUsers, getOneUser } = require("../controllers/userGet");
const { getPosts, getOnePost } = require("../controllers/authorGet");




const timeMiddleware = function (req, res, next) {
    req.requestTime = new Date().toUTCString();
    next();
  };





router.get('/user/:id',  getOneUser)
router.get('/post/:id', timeMiddleware, getOnePost)


router.post("/register-user", timeMiddleware, registerUser);
router.post("/register-author", timeMiddleware, registerAuthor);

router.get("/users",timeMiddleware, getUsers);
router.get("/posts", timeMiddleware, getPosts);

module.exports = {
  router,
};
