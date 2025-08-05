const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const createPostController = require("../controllers/post.controller");

const router = express.Router();

/* POST /api.posts [protected] {image} */
router.post(
  "/",
  authMiddleware /* req.user = userData */,
  createPostController
);

module.exports = router;
