import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ChatPreview from '../components/chatPreview';
import ChatWindow from '../components/ChatWindow';
import CreateGroupModal from '../components/CreateGroupModal'; // Import your CreateGroupModal component
import 'tailwindcss/tailwind.css';


const ChatPage = () => {
  const token = localStorage.getItem('token');
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const user = useSelector((state) => state.auth.user);

  const fetchChats = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/chat', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [token]);

  return (
    <>
      {user && (
        <div className="flex h-screen">
          <aside className="w-1/4 bg-gray-100 border-r border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Chats</h2>
              <button onClick={() => setShowModal(true)} className="flex items-center justify-center bg-blue-500 text-white rounded-full w-10 h-10 focus:outline-none hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
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
          {/* Render the CreateGroupModal component */}
          {showModal && <CreateGroupModal onClose={() => setShowModal(false)} />}
        </div>
      )}
    </>
  );
};

export default ChatPage;
