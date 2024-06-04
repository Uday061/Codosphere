// import React, { useState, useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import io from 'socket.io-client';
// import axios from 'axios';
// import { ClipLoader } from 'react-spinners';

// const ChatWindow = ({ chat }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [newMessage, setNewMessage] = useState("");
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [istyping, setIsTyping] = useState(false);
//   const user = useSelector((state) => state.auth.user);
//   const socketRef = useRef();
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     const socket = io('http://localhost:5555');
//     socketRef.current = socket;

//     socket.emit("setup", user);
//     socket.on("connected", () => setSocketConnected(true));
//     socket.on("typing", () => setIsTyping(true));
//     socket.on("stop typing", () => setIsTyping(false));

//     return () => {
//       socket.disconnect();
//     };
//   }, [user]);

//   useEffect(() => {
//     if (chat) {
//       const fetchChatMessages = async () => {
//         try {
//           setLoading(true);
//           const response = await axios.get(`http://localhost:5555/api/message/${chat._id}`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           });

//           setLoading(false);
//           setMessages(response.data);

//           socketRef.current.emit("join chat", chat._id);
//           socketRef.current.on('messageReceived', (message) => {
//             setMessages((prevMessages) => [...prevMessages, message]);
//           });
//         } catch (error) {
//           console.error('Error fetching chat messages:', error);
//           setLoading(false);
//         }
//       };
//       fetchChatMessages();

//       return () => {
//         socketRef.current.emit('leaveChat', chat._id);
//         socketRef.current.off('messageReceived');
//       };
//     }
//   }, [chat]);

//   const sendMessage = async () => {
//     if (newMessage.trim() === '') return;

//     try {
//       socketRef.current.emit("stop typing", chat._id);
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
//       socketRef.current.emit("new message", response.data);
//       setMessages((prevMessages) => [...prevMessages, response.data]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   useEffect(() => {
//     socketRef.current.on("message received", (newMessageReceived) => {
//       if (!chat || chat._id !== newMessageReceived.chat._id) {
//         // if chat is not selected or doesn't match current chat
//       } else {
//         setMessages([...messages, newMessageRecieved]);
//        // setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
//       }
//     });
//   });

//   useEffect(() => {
//     // Scroll to bottom whenever messages change
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const typingHandler = (e) => {
//     setNewMessage(e.target.value);

//     if (!socketConnected) return;

//     if (!typing) {
//       setTyping(true);
//       socketRef.current.emit("typing", chat._id);
//     }

//     const lastTypingTime = new Date().getTime();
//     const timerLength = 3000;

//     setTimeout(() => {
//       const timeNow = new Date().getTime();
//       const timeDiff = timeNow - lastTypingTime;
//       if (timeDiff >= timerLength && typing) {
//         socketRef.current.emit("stop typing", chat._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const formatMessageContent = (content) => {
//     return content.split('\n').map((line, index) => (
//       <span key={index}>
//         {line}
//         <br />
//       </span>
//     ));
//   };

//   let nextPerson = chat.users[0]._id;
//   let profilePictureUrl;
//   if (!chat.isGroupChat) {
//     if (nextPerson === user._id) {
//       nextPerson = chat.users[1].firstName;
//       profilePictureUrl = chat.users[1].picturePath;
//     } else {
//       nextPerson = chat.users[0].firstName;
//       profilePictureUrl = chat.users[0].picturePath;
//     }
//   } else {
//     nextPerson = chat.chatName;
//     // If it's a group chat, you may want to handle this differently
//     // For simplicity, let's just display the chat name
//   }

//   return (
//     <>
//       {user && (
//         <div className="flex-1 flex flex-col h-full">
//           <header className="bg-green-600 text-white p-4 flex items-center">
//             <img src={profilePictureUrl} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
//             <h1 className="text-xl font-bold">{nextPerson}</h1>
//           </header>
//           <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
//             {loading ? (
//               <div className="flex justify-center items-center h-full">
//                 <ClipLoader size={50} color={"#123abc"} loading={loading} /> {/* Spinner Component */}
//               </div>
//             ) : (
//               messages &&
//               messages.map((msg) => (
//                 <div key={msg._id} className={`mb-2 ${msg.sender._id === user._id ? 'text-right' : 'text-left'}`}>
//                   <div className="inline-block bg-white p-2 rounded-lg shadow">
//                     {formatMessageContent(msg.content)}
//                   </div>
//                 </div>
//               ))
//             )}
//             <div ref={messagesEndRef} />
//           </div>
//           <div className="p-4 bg-white border-t border-gray-200">
//             <textarea
//               className="w-full p-2 border border-gray-300 rounded resize-none"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={typingHandler}
//               onKeyDown={handleKeyDown}
//               rows="2"
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatWindow;




import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const ChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

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
          socketRef.current.on('message recieved', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
          });
          console.log(messages);
        } catch (error) {
          console.error('Error fetching chat messages:', error);
          setLoading(false);
        }
      };
      fetchChatMessages();

      return () => {
        socketRef.current.emit('leaveChat', chat._id);
        socketRef.current.off('message recieved');
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
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessageContent = (content) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  let nextPerson = chat.users[0]._id;
  let profilePictureUrl;
  if (!chat.isGroupChat) {
    if (nextPerson === user._id) {
      nextPerson = chat.users[1].firstName;
      profilePictureUrl = chat.users[1].picturePath;
    } else {
      nextPerson = chat.users[0].firstName;
      profilePictureUrl = chat.users[0].picturePath;
    }
  } else {
    nextPerson = chat.chatName;
    // If it's a group chat, you may want to handle this differently
    // For simplicity, let's just display the chat name
  }

  return (
    <>
      {user && (
        <div className="flex-1 flex flex-col h-full">
          <header className="bg-violet-500 text-white p-4 flex items-center">
            <img src={profilePictureUrl} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
            <h1 className="text-xl font-bold">{nextPerson}</h1>
          </header>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <ClipLoader size={50} color={"#123abc"} loading={loading} /> {/* Spinner Component */}
              </div>
            ) : (
              messages &&
              messages.map((msg) => (
                <div key={msg._id} className={`mb-2 ${msg.sender._id === user._id ? 'text-right' : 'text-left'}`}>
                  <div className="inline-block bg-white p-2 rounded-lg shadow">
                    <b>{msg.sender.firstName + " " +msg.sender.lastName}</b>
                    <br />
                    {formatMessageContent(msg.content)}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-white border-t border-gray-200">
            <textarea
              className="w-full p-2 border border-gray-300 rounded resize-none"
              placeholder="Type a message..."
              value={newMessage}
              onChange={typingHandler}
              onKeyDown={handleKeyDown}
              rows="2"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWindow;
