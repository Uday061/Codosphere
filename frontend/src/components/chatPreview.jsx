import React from 'react';
import { useSelector } from 'react-redux';


const ChatPreview = ({ chat }) => {
  const user = useSelector((state) => state.auth.user);
  const latestMessage = chat.latestMessage ? chat.latestMessage.content : "No messages yet";
  let nextPerson = chat.users[0]._id;
  if( nextPerson == user._id ) nextPerson = chat.users[1].firstName;
  else nextPerson = chat.users[0].firstName;
  const chatName = chat.isGroupChat ? chat.chatName : nextPerson;

  return (
    <div className="p-2 bg-white shadow rounded-lg mb-2">
      <h3 className="font-semibold">{chatName}</h3>
      <p className="text-gray-600">{latestMessage}</p>
    </div>
  );
};

export default ChatPreview;
