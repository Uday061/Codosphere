// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import io from 'socket.io-client';
// import axios from 'axios';



// const ChatWindow = ({ chat }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [newMessage, setNewMessage] = useState("");
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [istyping, setIsTyping] = useState(false);
//   const user = useSelector((state) => state.auth.user);
//   var socket, selectedChat;
//   selectedChat = chat;
//   useEffect(() => {
//     socket = io('http://localhost:5555');
//     socket.emit("setup", user);
//     socket.on("connected", () => setSocketConnected(true));
//     socket.on("typing", () => setIsTyping(true));
//     socket.on("stop typing", () => setIsTyping(false));

//     // eslint-disable-next-line
//   }, []);



//   useEffect(() => {
//     if (chat) {

//       let response;
//       const fetchChatMessages = async () => {
//         try {
//           setLoading(true);
//           response = await axios.get(`http://localhost:5555/api/message/${chat._id}`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           });

//           setLoading(false);
//           console.log(50);
//           console.log("This is chatId -> ", chat._id, "\n", " This is response for getting previous messages api -->", response.data);
//           setMessages(response.data);
//           console.log(52);
//           console.log("This is the message -->", messages);
//           console.log(54)

//         } catch (error) {
//           console.error('Error fetching chat messages:', error);
//         }
//       };
//       fetchChatMessages();

//       // Join the chat room for real-time updates

//       try {
//         socket.emit("join chat", chat._id);

//         // Listen for incoming messages
//         socket.on('messageReceived', (messages) => {
//           setMessages((prevMessages) => [...prevMessages, messages]);
//         });



//         // Cleanup when the component unmounts
//         return () => {
//           socket.emit('leaveChat', chat._id);
//           socket.off('messageReceived');
//         };
//       }
//       catch (error) {
//         console.log("hehe");
//       }
//     }
//   }, [chat]);



//   const sendMessage = async () => {
//     if (newMessage.trim() === '') return;

//     try {
//       socket.emit("stop typing", chat._id);
//       const response = await axios.post(
//         'http://localhost:5555/api/message',
//         { content: newMessage, chatId: chat._id },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       setNewMessage('');
//       console.log("this is sent message res -->", response);
//       socket.emit("new message", response.data);
//       setMessages([...messages, response.data]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   let nextPerson = chat.users[0]._id;
//   if (nextPerson == user._id) nextPerson = chat.users[1].firstName;
//   else nextPerson = chat.users[0].firstName;

//   return (
//     <>
//       {user && <div className="flex-1 flex flex-col">
//         <header className="bg-green-600 text-white p-4 flex items-center">
//           <h1 className="text-xl font-bold">{nextPerson}</h1>
//         </header>
//         <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
//           {messages && messages.map((msg) => (
//             <div key={msg._id} className={`mb-2 ${msg.sender._id === user._id ? 'text-right' : 'text-left'}`}>
//               <div className="bg-white p-2 rounded shadow">{msg.content}</div>
//             </div>
//           ))}
//         </div>
//         <div className="p-4 bg-white border-t border-gray-200">
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded"
//             placeholder="Type a message..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//           />
//           <button
//             className="bg-blue-500 text-white p-2 rounded mt-2"
//             onClick={sendMessage}
//           >
//             Send
//           </button>
//         </div>
//       </div>}
//     </>
//   );
// };

// export default ChatWindow;



import React, { useState, useEffect, useRef } from 'react';
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
  const socketRef = useRef();

  useEffect(() => {
    const socket = io('http://localhost:5555');
    socketRef.current = socket;

    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (chat) {
      const fetchChatMessages = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:5555/api/message/${chat._id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setLoading(false);
          setMessages(response.data);

          socketRef.current.emit("join chat", chat._id);
          socketRef.current.on('messageReceived', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
          });
        } catch (error) {
          console.error('Error fetching chat messages:', error);
          setLoading(false);
        }
      };
      fetchChatMessages();

      return () => {
        socketRef.current.emit('leaveChat', chat._id);
        socketRef.current.off('messageReceived');
      };
    }
  }, [chat]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      socketRef.current.emit("stop typing", chat._id);
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
      socketRef.current.emit("new message", response.data);
      setMessages((prevMessages) => [...prevMessages, response.data]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  useEffect(() => {
    socketRef.current.on("message recieved", (newMessageRecieved) => {
      if ( !chat || chat._id !== newMessageRecieved.chat._id ) // if chat is not selected or doesn't match current chat
      {
      
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socketRef.current.emit("typing", chat._id);
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socketRef.current.emit("stop typing", chat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  let nextPerson = chat.users[0]._id;
  if (nextPerson === user._id) nextPerson = chat.users[1].firstName;
  else nextPerson = chat.users[0].firstName;

  return (
    <>
      {user && (
        <div className="flex-1 flex flex-col">
          <header className="bg-green-600 text-white p-4 flex items-center">
            <h1 className="text-xl font-bold">{nextPerson}</h1>
          </header>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="spinner-border text-blue-500" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              messages &&
              messages.map((msg) => (
                <div key={msg._id} className={`mb-2 ${msg.sender._id === user._id ? 'text-right' : 'text-left'}`}>
                  <div className="bg-white p-2 rounded shadow">{msg.content}</div>
                </div>
              ))
            )}
          </div>
          <div className="p-4 bg-white border-t border-gray-200">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Type a message..."
              value={newMessage}
              onChange={typingHandler}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="bg-blue-500 text-white p-2 rounded mt-2" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWindow;
