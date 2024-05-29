const express = require("express");
const {  getUserFriends, addRemoveFriend ,getUserByjwt , setCodeforcesHandle,searchUsers} = require("../controllers/userController.js");
const { verifyToken } = require("../middleware/authMiddleware.js");


const router = express.Router();

/* READ */
// router.get("/:id", verifyToken, getUser);
router.get("/getUserByjwt", verifyToken, getUserByjwt);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get('/searchUsers',verifyToken,searchUsers);

router.post("/setCodeforcesHandle/:handle", verifyToken, setCodeforcesHandle);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend, searchUsers);

module.exports = router;