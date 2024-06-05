// import React from 'react';
// import { useSelector } from 'react-redux';


// const ChatPreview = ({ chat }) => {
//   const user = useSelector((state) => state.auth.user);
//   const latestMessage = chat.latestMessage ? chat.latestMessage.content : "No messages yet";
//   let nextPerson = chat.users[0]._id;
//   if( nextPerson == user._id ) nextPerson = chat.users[1].firstName;
//   else nextPerson = chat.users[0].firstName;
//   const chatName = chat.isGroupChat ? chat.chatName : nextPerson;

//   return (
//     <div className="p-2 bg-white shadow rounded-lg mb-2">
//       <h3 className="font-semibold">{chatName}</h3>
//       <p className="text-gray-600">{latestMessage}</p>
//     </div>
//   );
// };

// export default ChatPreview;


// import React from 'react';
// import { useSelector } from 'react-redux';

// const ChatPreview = ({ chat }) => {
//   const user = useSelector((state) => state.auth.user);

//   // Check if chat is an actual chat object or a search result (friend)
//   const isChat = chat.users && chat.users.length > 1;
//   const latestMessage = isChat && chat.latestMessage ? chat.latestMessage.content : "No messages yet";

//   // Determine the name to display
//   let nextPerson;
//   if (isChat) {
//     nextPerson = chat.users[0]._id === user._id ? chat.users[1].firstName : chat.users[0].firstName;
//   } else {
//     // This is a search result with a single friend object
//     nextPerson = `${chat.firstName} ${chat.lastName}`;
//   }
//   const chatName = isChat && chat.isGroupChat ? chat.chatName : nextPerson;

//   return (
//     <div className="p-2 bg-white shadow rounded-lg mb-2">
//       <h3 className="font-semibold">{chatName}</h3>
//       {isChat && <p className="text-gray-600">{latestMessage}</p>}
//     </div>
//   );
// };

// export default ChatPreview;
import React from 'react';
import { useSelector } from 'react-redux';

const ChatPreview = ({ chat }) => {
  const user = useSelector((state) => state.auth.user);

  // Check if it's a chat object or a search result
  const isChat = chat.users && chat.users.length > 0;

  let chatName;
  let latestMessage = "No messages yet";

  if (isChat) {
    latestMessage = chat.latestMessage ? chat.latestMessage.content : latestMessage;
    const nextPerson = chat.users.find(u => u._id !== user._id);
    chatName = chat.isGroupChat ? chat.chatName : nextPerson ? `${nextPerson.firstName} ${nextPerson.lastName}` : "Unknown";
  } else {
    chatName = `${chat.firstName} ${chat.lastName}`;
  }

  return (
    <div className="p-2 bg-white shadow rounded-lg mb-2">
      <h3 className="font-semibold">{chatName}</h3>
      {isChat && <p className="text-gray-600">{latestMessage}</p>}
    </div>
  );
};

export default ChatPreview;
