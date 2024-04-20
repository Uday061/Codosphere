const express = require("express");
const {  getUserFriends, addRemoveFriend ,getUserByjwt} = require("../controllers/userController.js");
const { verifyToken } = require("../middleware/authMiddleware.js");


const router = express.Router();

/* READ */
// router.get("/:id", verifyToken, getUser);
router.get("/getUserByjwt", verifyToken, getUserByjwt);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

module.exports = router;