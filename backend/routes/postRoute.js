const express = require("express");
const { getFeedPosts, getUserPosts, likePost , createPost } = require("../controllers/postController.js");
const { verifyToken } = require("../middleware/authMiddleware.js");

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);


router.post("/create", verifyToken, createPost);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

module.exports = router;