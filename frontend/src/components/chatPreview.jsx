import React from 'react';

const ChatPreview = ({ chat }) => {
  const latestMessage = chat.latestMessage ? chat.latestMessage.content : "No messages yet";
  const chatName = chat.isGroupChat ? chat.chatName : chat.users[0].firstName;

  return (
    <div className="p-2 bg-white shadow rounded-lg mb-2">
      <h3 className="font-semibold">{chatName}</h3>
      <p className="text-gray-600">{latestMessage}</p>
    </div>
  );
};

export default ChatPreview;
