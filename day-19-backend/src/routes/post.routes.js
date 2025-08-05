const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const createPostController = require("../controllers/post.controller");
const multer = require("multer");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

/* POST /api.posts [protected] {image} */
router.post(
  "/posts",
  authMiddleware /* req.user = userData */,
  upload.single("image"), /* making file readable(via multer) for express */
  createPostController
);

module.exports = router;
