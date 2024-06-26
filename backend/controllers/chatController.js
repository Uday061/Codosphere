// const asyncHandler = require("express-async-handler");
// const mongoose = require("mongoose");
// const Chat = require("../models/chat");
// const User = require("../models/user");
// //@description     Create or fetch One to One Chat
// //@route           POST /api/chat/
// //@access          Protected
// // const accessChat = asyncHandler(async (req, res) => {
// //   const { userId } = req.body;

// //   if (!userId) {
// //     console.log("UserId param not sent with request");
// //     return res.sendStatus(400);
// //   }

// //   var isChat = await Chat.find({
// //     isGroupChat: false,
// //     $and: [
// //       { users: { $elemMatch: { $eq: req.user } } },
// //       { users: { $elemMatch: { $eq: userId } } },
// //     ],
// //   })
// //     .populate("users", "-password")
// //     .populate("latestMessage");

// //   isChat = await User.populate(isChat, {
// //     path: "latestMessage.sender",
// //     select: "name pic email",
// //   });

// //   if (isChat.length > 0) {
// //     res.send(isChat[0]);
// //   } else {
// //     var chatData = {
// //       chatName: "sender",
// //       isGroupChat: false,
// //       users: [req.user.id, userId],
// //     };

// //     try {
// //       const createdChat = await Chat.create(chatData);
// //       const FullChat = await Chat.findOne({ _id: createdChat }).populate(
// //         "users",
// //         "-password"
// //       );
// //       res.status(200).json(FullChat);
// //     } catch (error) {
// //       res.status(400);
// //       throw new Error(error.message);
// //     }
// //   }
// // });
// const accessChat = asyncHandler(async (req, res) => {
//   const { userId } = req.body;

//   if (!userId) {
//     console.log("UserId param not sent with request");
//     return res.sendStatus(400);
//   }

//   try {
//     const userObjectId = mongoose.Types.ObjectId(userId);
//     const loggedUserObjectId = mongoose.Types.ObjectId(req.user.id);

//     let isChat = await Chat.find({
//       isGroupChat: false,
//       $and: [
//         { users: { $elemMatch: { $eq: loggedUserObjectId } } },
//         { users: { $elemMatch: { $eq: userObjectId } } },
//       ],
//     })
//       .populate("users", "-password")
//       .populate("latestMessage");

//     isChat = await User.populate(isChat, {
//       path: "latestMessage.sender",
//       select: "name pic email",
//     });

//     if (isChat.length > 0) {
//       res.send(isChat[0]);
//     } else {
//       const chatData = {
//         chatName: "sender",
//         isGroupChat: false,
//         users: [loggedUserObjectId, userObjectId],
//       };

//       const createdChat = await Chat.create(chatData);
//       const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
//         "users",
//         "-password"
//       );
//       res.status(200).json(fullChat);
//     }
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });
// //@description     Fetch all chats for a user
// //@route           GET /api/chat/
// //@access          Protected
// const fetchChats = asyncHandler(async (req, res) => {
//   try {
//     Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
//       .populate("users", "-password")
//       .populate("groupAdmin", "-password")
//       .populate("latestMessage")
//       .sort({ updatedAt: -1 })
//       .then(async (results) => {
//         results = await User.populate(results, {
//           path: "latestMessage.sender",
//           select: "name pic email",
//         });
//         res.status(200).send(results);
//       });
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });

// //@description     Create New Group Chat
// //@route           POST /api/chat/group
// //@access          Protected
// const createGroupChat = asyncHandler(async (req, res) => {
//   if (!req.body.users || !req.body.name) {
//     return res.status(400).send({ message: "Please Fill all the feilds" });
//   }

//   console.log(85);

//   const loggedUser  = await User.findById(req.user.id); 

//   var users = req.body.users;

//   if (users.length < 2) {
//     return res
//       .status(400)
//       .send("More than 2 users are required to form a group chat");
//   }
//   console.log(94);

//   users.push(loggedUser);

//   try {
//     const groupChat = await Chat.create({
//       chatName: req.body.name,
//       users: users,
//       isGroupChat: true,
//       groupAdmin: loggedUser,
//     });

//     console.log(106);

//     const fullGroupChat = await Chat.findOne({ _id: groupChat })
//       .populate("users", "-password")
//       .populate("groupAdmin", "-password");

//       console.log(112);

//     res.status(200).json(fullGroupChat);
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });

// // @desc    Rename Group
// // @route   PUT /api/chat/rename
// // @access  Protected
// const renameGroup = asyncHandler(async (req, res) => {
//   const { chatId, chatName } = req.body;

//   const updatedChat = await Chat.findByIdAndUpdate(
//     chatId,
//     {
//       chatName: chatName,
//     },
//     {
//       new: true,
//     }
//   )
//     .populate("users", "-password")
//     .populate("groupAdmin", "-password");

//   if (!updatedChat) {
//     res.status(404);
//     throw new Error("Chat Not Found");
//   } else {
//     res.json(updatedChat);
//   }
// });

// // @desc    Remove user from Group
// // @route   PUT /api/chat/groupremove
// // @access  Protected
// const removeFromGroup = asyncHandler(async (req, res) => {
//   const { chatId, userId } = req.body;

//   // check if the requester is admin

//   const removed = await Chat.findByIdAndUpdate(
//     chatId,
//     {
//       $pull: { users: userId },
//     },
//     {
//       new: true,
//     }
//   )
//     .populate("users", "-password")
//     .populate("groupAdmin", "-password");

//   if (!removed) {
//     res.status(404);
//     throw new Error("Chat Not Found");
//   } else {
//     res.json(removed);
//   }
// });

// // @desc    Add user to Group / Leave
// // @route   PUT /api/chat/groupadd
// // @access  Protected
// const addToGroup = asyncHandler(async (req, res) => {
//   const { chatId, userId } = req.body;

//   // check if the requester is admin

//   const added = await Chat.findByIdAndUpdate(
//     chatId,
//     {
//       $push: { users: userId },
//     },
//     {
//       new: true,
//     }
//   )
//     .populate("users", "-password")
//     .populate("groupAdmin", "-password");

//   if (!added) {
//     res.status(404);
//     throw new Error("Chat Not Found");
//   } else {
//     res.json(added);
//   }
// });

// module.exports = {
//   accessChat,
//   fetchChats,
//   createGroupChat,
//   renameGroup,
//   addToGroup,
//   removeFromGroup,
// };

const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Chat = require("../models/chat");
const User = require("../models/user");

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const loggedUserObjectId = new mongoose.Types.ObjectId(req.user.id);

    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: loggedUserObjectId } } },
        { users: { $elemMatch: { $eq: userObjectId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [loggedUserObjectId, userObjectId],
      };

      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullChat);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the fields" });
  }

  const loggedUser = await User.findById(req.user.id);

  var users = req.body.users;

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(loggedUser);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: loggedUser,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
