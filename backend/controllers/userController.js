const User =  require("../models/user.js");


/* READ */
// const getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     // const user = await User.findById(id);
//   console.log('first')
//     const user = await User.findById(uu.id._id);
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//     // res.status(404).json({uu });
//   }
// };
const getUserByjwt = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.password=""
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    console.log(friend);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message  });
    
  }
};




const setCodeforcesHandle = async (req, res) => {
  try {
    const { handle} = req.params;
    const userId=req.user.id;
    // Find the user by ID and update the codeForcesHandle field
    const user = await User.findByIdAndUpdate(
      userId,
      { codeForcesHandle: handle },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send only the relevant user data in the response
    res.status(200).json({
      _id: user._id,
      codeForcesHandle: user.codeForcesHandle,
      // Add other fields you want to include in the response
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};









module.exports = { getUserFriends , addRemoveFriend ,getUserByjwt , setCodeforcesHandle};




