const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/authorization");
const { registerAuthor } = require("../controllers/postAuthorization");

const {getPostsAcrossDate} = require("../controllers/getPostsAcrossDate")

const { getUsers, getOneUser } = require("../controllers/userGet");
const {
  getPosts,
  getOnePost,
  setOnePost,
  findOnePostDelete
} = require("../controllers/postGet");

const timeMiddleware = function (req, res, next) {
  req.requestTime = new Date().toUTCString();
  next();
};

router.delete("/post/:id", timeMiddleware, findOnePostDelete)

router.patch("/post/:id", timeMiddleware, setOnePost);

router.post("/posts-date",timeMiddleware, getPostsAcrossDate)

router.get("/user/:id", timeMiddleware, getOneUser);
router.get("/post/:id", timeMiddleware, getOnePost);

router.post("/register-user", timeMiddleware, registerUser);
router.post("/register-post", timeMiddleware, registerAuthor);

router.get("/users", timeMiddleware, getUsers);
router.get("/posts", timeMiddleware, getPosts);

module.exports = {
  router,
};
