import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';



const ChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const user = useSelector((state) => state.auth.user);
  var socket
  useEffect(() => {
    socket = io('http://localhost:5555');
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (chat) {
      console.log(chat._id ," <-- ");
      // Fetch the chat messages when the chat is selected
      const fetchChatMessages = async () => {
        try {
          
          setLoading(true);
    
          const response = await axios.get(`http://localhost:5555/api/message/${chat._id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

          setMessages(response.data);
          setLoading(false);
    
          socket.emit("join chat", chat._id);
          console.log(" This is response for getting previous messages api ","This is chatId -> ",chat._id ,"\n",response.data);
        } catch (error) {
          console.error('Error fetching chat messages:', error);
        }
      };
      fetchChatMessages();

      // Join the chat room for real-time updates
      socket.emit("join chat", chat._id);

      // Listen for incoming messages
      socket.on('messageReceived', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // Cleanup when the component unmounts
      return () => {
        socket.emit('leaveChat', chat._id);
        socket.off('messageReceived');
      };
    }
  }, [chat]);

  

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const response = await axios.post(
        'http://localhost:5555/api/message',
        { content: newMessage, chatId: chat._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setNewMessage('');
      console.log("this is sent message res -->" ,response);
      socket.emit("new message", response.data);
      setMessages([...messages, response.data]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  let nextPerson = chat.users[0]._id;
  if( nextPerson == user._id ) nextPerson = chat.users[1].firstName;
  else nextPerson = chat.users[0].firstName;

  return (
    <>
    { user && <div className="flex-1 flex flex-col">
      <header className="bg-green-600 text-white p-4 flex items-center">
        <h1 className="text-xl font-bold">{nextPerson}</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        { messages && messages.map((msg) => (
          <div key={msg._id} className={`mb-2 ${msg.sender._id === user._id ? 'text-right' : 'text-left'}`}>
            <div className="bg-white p-2 rounded shadow">{msg.content}</div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded mt-2"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>}
    </>
  );
};

export default ChatWindow;
