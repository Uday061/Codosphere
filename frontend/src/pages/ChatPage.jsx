import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ChatPreview from '../components/ChatPreview';
import ChatWindow from '../components/ChatWindow';
import 'tailwindcss/tailwind.css';

const token = localStorage.getItem('token');

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const fetchChats = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/chat', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChats(response.data);
      console.log("fetch chat response ->", response);
      console.log(chats);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  useEffect(() => {
    fetchChats();
    
  }, []);

  return (
    <>
      {user && (
        <div className="flex h-screen">
          <aside className="w-1/4 bg-gray-100 border-r border-gray-200 p-4">
            <h2 className="text-2xl font-bold mb-4">Chats</h2>
            <div className="space-y-2">
              {chats.map((chat) => (
                <div key={chat._id} onClick={() => setSelectedChat(chat)}>
                  <ChatPreview chat={chat} />
                </div>
              ))}
            </div>
          </aside>
          <main className="flex-1 flex flex-col">
            {selectedChat ? (
              <ChatWindow chat={selectedChat} />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">Select a chat to start messaging</p>
              </div>
            )}
          </main>
        </div>
      )}
    </>
  );
};

export default ChatPage;
