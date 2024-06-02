import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ChatPreview from '../components/chatPreview'; // Import the new component
import 'tailwindcss/tailwind.css';

const token = localStorage.getItem('token');
const socket = io('http://localhost:5555');

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/chat', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setMessages(response.data);
      
      console.log(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-gray-100 border-r border-gray-200 p-4">
        <h2 className="text-2xl font-bold mb-4">Chats</h2>
        { messages && <div className="space-y-2">
          {messages.map((chat) => (
            <ChatPreview key={chat._id} chat={chat} />
          ))}
        </div>}
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="bg-green-600 text-white p-4 flex items-center">
          <img src="/path-to-user-avatar.jpg" alt="User Avatar" className="w-10 h-10 rounded-full mr-4" />
          <h1 className="text-xl font-bold">Chat</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {/* This section will be updated to show the actual chat messages */}
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
