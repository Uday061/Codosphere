
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { FaUserPlus, FaUserMinus } from 'react-icons/fa';

// const Post = (props) => {
//     const user = useSelector((state) => state.auth.user);
//     const [likes, setLikes] = useState(props.post.likes.length || 0);
//     const [isLiked, setIsLiked] = useState(false);
//     const [isFriend, setIsFriend] = useState(false);
//     const token = localStorage.getItem('token');

//     useEffect(() => {
//         setIsLiked(props.post.likes.includes(user._id)); // Check if the current user liked the post
//         setIsFriend(user.friends.includes(props.post.userId)); // Check if the user who posted the post is a friend
//     }, [props.post.likes, props.post.userId, user._id, user.friends]);

//     const handleClickLike = async () => {
//         try {
//             const url = `http://localhost:5555/api/post/${props.post._id}/like`;
//             const response = await axios.patch(url, {}, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });

//             if (response.status === 200) {
//                 setIsLiked(!isLiked);
//                 setLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1);
//             }
//         } catch (error) {
//             console.error('Error liking the post:', error);
//         }
//     };

//     const handleAddRemoveFriend = async () => {
//         try {
//             const url = `http://localhost:5555/api/user/${user._id}/${props.post.userId}`;
//             const response = await axios.patch(url, {}, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });

//             if (response.status === 200) {
//                 setIsFriend(!isFriend);
//             }
//         } catch (error) {
//             console.error('Error adding/removing friend:', error);
//         }
//     };

//     const buttonStyle = {
//         color: 'black', // Set the color of the icon to black
//         cursor: 'pointer',
//         marginLeft: '5px', // Adjust the margin to make the button close to the name
//     };

//     const formattedDate = new Date(props.post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
//     const ms = Date.now() - new Date("2024-04-14T20:17:27.310Z");
//     const hrs = ms / 36e5;
//     const timeAgo = hrs < 24 ?
//         `${Math.round(hrs)} hr` :
//         hrs < 168 ?
//             `${Math.round(hrs / 24)} d ` :
//             hrs < 720 ?
//                 `${Math.round(hrs / 168)} w` :
//                 hrs < 8760 ?
//                     `${Math.round(hrs / 720)} mo` :
//                     `${Math.round(hrs / 8760)} yr`;

//     return (
//         <div className="flex bg-blue-300 shadow-lg rounded-lg mx-4 md:mx-auto my-56 max-w-md md:max-w-2xl">
//             <div className="flex items-start px-4 py-6">
//                 <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar" />
//                 <div className="">
//                     <div className="flex items-center ">
//                         <h2 className="text-lg font-semibold text-gray-900 -mt-1">{props.post.firstName + " " + props.post.lastName} </h2>
//                         {user._id !== props.post.userId && (
//                             <button style={buttonStyle} onClick={handleAddRemoveFriend}>
//                                 {isFriend ? <FaUserMinus /> : <FaUserPlus />}
//                             </button>
//                         )}
//                     </div>
//                     <p className="text-gray-700">{formattedDate} </p>
//                     <div> <img src={props.post.picturePath} alt="postPic" /></div>
//                     <p className="mt-3 text-gray-700 text-sm">
//                         {props.post.description}
//                     </p>
//                     <div className="mt-4 flex items-center">
//                         <div className="flex mr-2 text-gray-700 text-sm mr-3">
//                             <div style={buttonStyle} onClick={handleClickLike}>
//                                 <svg fill={isLiked ? 'red' : 'none'} viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                                 </svg>
//                             </div>
//                             <span>{likes}</span>
//                         </div>
//                         <div className="flex mr-2 text-gray-700 text-sm mr-8">
//                             <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
//                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
//                             </svg>
//                             <span>{props.post.comments.length}</span>
//                         </div>
//                         <div className="flex mr-2 text-gray-700 text-sm mr-4">
//                             <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
//                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//                             </svg>
//                             <span>share</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Post;





//one level nesting and working 


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { FaUserPlus, FaUserMinus } from 'react-icons/fa';

// const Post = ({ post }) => {
//   const user = useSelector((state) => state.auth.user);
//   const [likes, setLikes] = useState(post.likes.length);
//   const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
//   const [isFriend, setIsFriend] = useState(user.friends.includes(post.userId));
//   const [showCommentsModal, setShowCommentsModal] = useState(false);
//   const [newCommentContent, setNewCommentContent] = useState('');
//   const [comments, setComments] = useState(post.comments);
//   const [replyingTo, setReplyingTo] = useState(null); // Keep track of the comment being replied to
//   const token = localStorage.getItem('token');

//   const handleClickLike = async () => {
//     try {
//       const url = `http://localhost:5555/api/post/${post._id}/like`;
//       const response = await axios.patch(url, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (response.status === 200) {
//         setIsLiked(!isLiked);
//         setLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1);
//       }
//     } catch (error) {
//       console.error('Error liking the post:', error);
//     }
//   };

//   const handleAddRemoveFriend = async () => {
//     try {
//       const url = `http://localhost:5555/api/user/${user._id}/${post.userId}`;
//       const response = await axios.patch(url, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (response.status === 200) {
//         setIsFriend(!isFriend);
//       }
//     } catch (error) {
//       console.error('Error adding/removing friend:', error);
//     }
//   };

//   const handleShowComments = async () => {
//     setShowCommentsModal(true);
//     // Fetch comments if needed
//     // const response = await axios.get(`http://localhost:5555/api/post/${post._id}/comments`);
//     // setComments(response.data);
//   };

//   const handleHideComments = () => {
//     setShowCommentsModal(false);
//     setReplyingTo(null); // Reset replyingTo when closing the modal
//   };

//   const handleCreateComment = async () => {
//     try {
//       const response = await axios.post(`http://localhost:5555/api/post/${post._id}/comment`, {
//         content: newCommentContent,
//         userId: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         parentComment: replyingTo ? replyingTo._id : null, // Set parentComment if replying to a comment
//       });
//       if (replyingTo) {
//         // If replying to a comment, update the comments array accordingly
//         const updatedComments = comments.map(comment => {
//           if (comment._id === replyingTo._id) {
//             return {
//               ...comment,
//               comments: comment.comments ? [...comment.comments, response.data.comment] : [response.data.comment]
//             };
//           }
//           return comment;
//         });
//         setComments(updatedComments);
//       } else {
//         // If not replying to a comment, simply add the new comment to the comments array
//         setComments([...comments, response.data.comment]);
//       }
//       setNewCommentContent('');
//       setReplyingTo(null); // Reset replyingTo after posting the comment
//     } catch (error) {
//       console.error('Error creating comment:', error);
//     }
//   };

//   const handleReply = (comment) => {
//     // Set the comment being replied to
//     setReplyingTo(comment);
//     // Scroll to the input area for a better user experience
//     window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
//   };

//   return (
//     <div className="flex bg-blue-300 shadow-lg rounded-lg mx-4 md:mx-auto my-56 max-w-md md:max-w-2xl">
//       {/* Post content */}
//       <div className="flex items-start px-4 py-6">
//         <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={post.userPicturePath} alt="avatar" />
//         <div className="">
//           <div className="flex items-center ">
//             <h2 className="text-lg font-semibold text-gray-900 -mt-1">{post.firstName + " " + post.lastName} </h2>
//             <button style={{ color: 'black', cursor: 'pointer', marginLeft: '5px' }} onClick={handleAddRemoveFriend}>
//               {isFriend ? <FaUserMinus /> : <FaUserPlus />}
//             </button>
//           </div>
//           <p className="text-gray-700">{post.createdAt} </p>
//           <img src={post.picturePath} alt="postPic" />
//           <p className="mt-3 text-gray-700 text-sm">{post.description}</p>
//           <div className="mt-4 flex items-center">
//             <div style={{ marginRight: '10px' }}>
//               <svg fill={isLiked ? 'red' : 'none'} viewBox="0 0 24 24" className="w-6 h-6 mr-1 cursor-pointer" onClick={handleClickLike} stroke="currentColor">
//                 {/* Like icon */}
//               </svg>
//               <span>{likes}</span>
//             </div>
//             <div style={{ marginRight: '10px' }} className="cursor-pointer" onClick={handleShowComments}>
//               <svg fill="none" viewBox="0 0 24 24" className="w-6 h-6 mr-1" stroke="currentColor">
//                 {/* Comments icon */}
//               </svg>
//               <span>{comments.length}</span>
//             </div>
//             {showCommentsModal && (
//               <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
//                 <div className="bg-white rounded-lg p-4 w-3/4">
//                   <div className="flex justify-between mb-4">
//                     <h2 className="text-lg font-semibold">Comments</h2>
//                     <button onClick={handleHideComments} className="text-blue-500 hover:text-blue-700">Close</button>
//                   </div>
//                   <div className="overflow-y-auto max-h-80">
//                     {comments.map(comment => (
//                       <div key={comment._id} className={`bg-gray-200 p-2 rounded-md mb-2 ${replyingTo === comment ? 'border border-blue-500' : ''}`}>
//                         <b><p className="text-black">{comment.firstName} {comment.lastName}</p></b>
//                         <p className="text-gray-800">{comment.content}</p>
//                         <button onClick={() => handleReply(comment)} className="text-blue-500 text-sm">Reply</button>
//                         {/* Nested comments */}
//                         {comment.comments && comment.comments.map(nestedComment => (
//                           <div key={nestedComment._id} className="bg-gray-100 p-2 rounded-md ml-4 mb-1">
//                             <b><p className="text-black">{nestedComment.firstName} {nestedComment.lastName}</p></b>
//                             <p className="text-gray-800">{nestedComment.content}</p>
//                           </div>
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                   {/* Input area for new comment */}
//                   <div className="mt-4">
//                     <input type="text" value={newCommentContent} onChange={(e) => setNewCommentContent(e.target.value)} placeholder="Add a comment..." className="w-full border rounded-md py-2 px-3" />
//                     <button onClick={handleCreateComment} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Post</button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Post;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { FaUserPlus, FaUserMinus } from 'react-icons/fa';

// const Post = ({ post }) => {
//     const user = useSelector((state) => state.auth.user);
//     const [likes, setLikes] = useState(post.likes.length);
//     const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
//     const [isFriend, setIsFriend] = useState(user.friends.includes(post.userId));
//     const [showCommentsModal, setShowCommentsModal] = useState(false);
//     const [newCommentContent, setNewCommentContent] = useState('');
//     const [comments, setComments] = useState(post.comments);
//     const [replyingTo, setReplyingTo] = useState(null); // Keep track of the comment being replied to
//     const token = localStorage.getItem('token');

//     const handleClickLike = async () => {
//         try {
//             const url = `http://localhost:5555/api/post/${post._id}/like`;
//             const response = await axios.patch(url, {}, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });

//             if (response.status === 200) {
//                 setIsLiked(!isLiked);
//                 setLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1);
//             }
//         } catch (error) {
//             console.error('Error liking the post:', error);
//         }
//     };

//     const handleAddRemoveFriend = async () => {
//         try {
//             const url = `http://localhost:5555/api/user/${user._id}/${post.userId}`;
//             const response = await axios.patch(url, {}, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });

//             if (response.status === 200) {
//                 setIsFriend(!isFriend);
//             }
//         } catch (error) {
//             console.error('Error adding/removing friend:', error);
//         }
//     };

//     const handleShowComments = async () => {
//         setShowCommentsModal(true);
//     };

//     const handleHideComments = () => {
//         setShowCommentsModal(false);
//         setReplyingTo(null); // Reset replyingTo when closing the modal
//     };

//     const handleCreateComment = async () => {
//         try {
//             const response = await axios.post(`http://localhost:5555/api/post/${post._id}/comment`, {
//                 content: newCommentContent,
//                 userId: user._id,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 parentId: replyingTo ? replyingTo._id : null, // Set parentComment if replying to a comment
//             });
//             console.log(response);
//             const newComment = response.data.comment;

//             if (replyingTo) {
//                 // If replying to a comment, update the comments array accordingly
//                 setComments(prevComments => [...prevComments, newComment]);
//             } else {
//                 // If not replying to a comment, simply add the new comment to the comments array
//                 setComments([...comments, newComment]);
//             }
//             setNewCommentContent('');
//             setReplyingTo(null); // Reset replyingTo after posting the comment
//         } catch (error) {
//             console.error('Error creating comment:', error);
//         }
//     };

//     const handleReply = (comment) => {
//         // Set the comment being replied to
//         setReplyingTo(comment);
//         // Scroll to the input area for a better user experience
//         window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
//     };

//     const renderComments = (parentId = null, depth = 0) => {
//         return comments
//             .filter(comment => comment.parentId === parentId)
//             .map(comment => (
//                 <div key={comment._id} className={`bg-gray-200 p-2 rounded-md mb-2 ${depth > 0 ? `ml-${depth * 2}` : ''} ${replyingTo === comment ? 'border-l-2 border-blue-500 pl-2' : ''}`}>
//                     <b><p className="text-black">{comment.firstName} {comment.lastName}</p></b>
//                     <p className="text-gray-800">{comment.content}</p>
//                     <button onClick={() => handleReply(comment)} className="text-blue-500 text-sm">Reply</button>
//                     {/* Render nested comments */}
//                     {renderComments(comment._id, depth + 1)}
//                 </div>
//             ));
//     };

//     return (
//         <div className="flex bg-blue-300 shadow-lg rounded-lg mx-4 md:mx-auto my-56 max-w-md md:max-w-2xl">
//             {/* Post content */}
//             <div className="flex items-start px-4 py-6">
//                 <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={post.userPicturePath} alt="avatar" />
//                 <div className="">
//                     <div className="flex items-center ">
//                         <h2 className="text-lg font-semibold text-gray-900 -mt-1">{post.firstName + " " + post.lastName} </h2>
//                         <button style={{ color: 'black', cursor: 'pointer', marginLeft: '5px' }} onClick={handleAddRemoveFriend}>
//                             {isFriend ? <FaUserMinus /> : <FaUserPlus />}
//                         </button>
//                     </div>
//                     <p className="text-gray-700">{post.createdAt} </p>
//                     <img src={post.picturePath} alt="postPic" />
//                     <p className="mt-3 text-gray-700 text-sm">{post.description}</p>
//                     <div className="mt-4 flex items-center">
//                         <div style={{ marginRight: '10px' }}>
//                             <svg fill={isLiked ? 'red' : 'none'} viewBox="0 0 24 24" className="w-6 h-6 mr-1 cursor-pointer" onClick={handleClickLike} stroke="currentColor">
//                                 {/* Like icon */}
//                             </svg>
//                             <span>{likes}</span>
//                         </div>
//                         <div style={{ marginRight: '10px' }} className="cursor-pointer" onClick={handleShowComments}>
//                             <svg fill="none" viewBox="0 0 24 24" className="w-6 h-6 mr-1" stroke="currentColor">
//                                 {/* Comments icon */}
//                             </svg>
//                             <span>{comments.length}</span>
//                         </div>
//                         {showCommentsModal && (
//                             <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
//                                 <div className="bg-white rounded-lg p-4 w-3/4">
//                                     <div className="flex justify-between mb-4">
//                                         <h2 className="text-lg font-semibold">Comments</h2>
//                                         <button onClick={handleHideComments} className="text-blue-500 hover:text-blue-700">Close</button>
//                                     </div>
//                                     <div className="overflow-y-auto max-h-80">
//                                         {renderComments()}
//                                     </div>
//                                     {/* Input area for new comment */}
//                                     <div className="mt-4">
//                                         <input type="text" value={newCommentContent} onChange={(e) => setNewCommentContent(e.target.value)} placeholder="Add a comment..." className="w-full border rounded-md py-2 px-3" />
//                                         <button onClick={handleCreateComment} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Post</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Post;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { FaUserPlus, FaUserMinus } from 'react-icons/fa';

// const Post = ({ post }) => {
//     const user = useSelector((state) => state.auth.user);
//     const [likes, setLikes] = useState(post.likes.length);
//     const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
//     const [isFriend, setIsFriend] = useState(user.friends.includes(post.userId));
//     const [showCommentsModal, setShowCommentsModal] = useState(false);
//     const [newCommentContent, setNewCommentContent] = useState('');
//     const [comments, setComments] = useState(post.comments);
//     const [replyingTo, setReplyingTo] = useState(null); // Keep track of the comment being replied to
//     const token = localStorage.getItem('token');

//     const handleClickLike = async () => {
//         try {
//             const url = `http://localhost:5555/api/post/${post._id}/like`;
//             const response = await axios.patch(url, {}, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });

//             if (response.status === 200) {
//                 setIsLiked(!isLiked);
//                 setLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1);
//             }
//         } catch (error) {
//             console.error('Error liking the post:', error);
//         }
//     };

//     const handleAddRemoveFriend = async () => {
//         try {
//             const url = `http://localhost:5555/api/user/${user._id}/${post.userId}`;
//             const response = await axios.patch(url, {}, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });

//             if (response.status === 200) {
//                 setIsFriend(!isFriend);
//             }
//         } catch (error) {
//             console.error('Error adding/removing friend:', error);
//         }
//     };

//     const handleShowComments = async () => {
//         setShowCommentsModal(true);
//     };

//     const handleHideComments = () => {
//         setShowCommentsModal(false);
//         setReplyingTo(null); // Reset replyingTo when closing the modal
//     };

//     const handleCreateComment = async () => {
//         try {
//             const response = await axios.post(`http://localhost:5555/api/post/${post._id}/comment`, {
//                 content: newCommentContent,
//                 userId: user._id,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 parentId: replyingTo ? replyingTo._id : null, // Set parentComment if replying to a comment
//             });
//             const newCommentAdded = response.data.newComment;
//             console.log("new comment added\n",newCommentAdded);
//             // Append the new comment to the comments array
//             setComments(prevComments => [...prevComments, newCommentAdded]);
//             setNewCommentContent('');
//             setReplyingTo(null); // Reset replyingTo after posting the comment
//             // setShowCommentsModal(false)
//         } catch (error) {
//             console.error('Error creating comment:', error);
//         }
//     };

//     const handleReply = (comment) => {
//         // Set the comment being replied to
//         setReplyingTo(comment);
//         // Scroll to the input area for a better user experience
//         window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
//     };

//     const renderComments = (parentIdd = null, depth = 0) => {
//         return comments
//             .filter(comment => comment.parentId === parentIdd)
//             .map(comment => (
//                 <div key={comment._id} className={`bg-gray-200 p-2 rounded-md mb-2 ${depth > 0 ? `ml-${depth * 2}` : ''} ${replyingTo === comment ? 'border-l-2 border-blue-500 pl-2' : ''}`}>
//                     <b><p className="text-black">{comment.firstName} {comment.lastName}</p></b>
//                     <p className="text-gray-800">{comment.content}</p>
//                     <button onClick={() => handleReply(comment)} className="text-blue-500 text-sm">Reply</button>
//                     {/* Render nested comments */}
//                     {renderComments(comment._id, depth + 1)}
//                 </div>
//             ));
//     };

//     return (
//         <div className="flex bg-blue-300 shadow-lg rounded-lg mx-4 md:mx-auto my-56 max-w-md md:max-w-2xl">
//             {/* Post content */}
//             <div className="flex items-start px-4 py-6">
//                 <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={post.userPicturePath} alt="avatar" />
//                 <div className="">
//                     <div className="flex items-center ">
//                         <h2 className="text-lg font-semibold text-gray-900 -mt-1">{post.firstName + " " + post.lastName} </h2>
//                         <button style={{ color: 'black', cursor: 'pointer', marginLeft: '5px' }} onClick={handleAddRemoveFriend}>
//                             {isFriend ? <FaUserMinus /> : <FaUserPlus />}
//                         </button>
//                     </div>
//                     <p className="text-gray-700">{post.createdAt} </p>
//                     <img src={post.picturePath} alt="postPic" />
//                     <p className="mt-3 text-gray-700 text-sm">{post.description}</p>
//                     <div className="mt-4 flex items-center">
//                         <div style={{ marginRight: '10px' }}>
//                             <svg fill={isLiked ? 'red' : 'none'} viewBox="0 0 24 24" className="w-6 h-6 mr-1 cursor-pointer" onClick={handleClickLike} stroke="currentColor">
//                                 {/* Like icon */}
//                             </svg>
//                             <span>{likes}</span>
//                         </div>
//                         <div style={{ marginRight: '10px' }} className="cursor-pointer" onClick={handleShowComments}>
//                             <svg fill="none" viewBox="0 0 24 24" className="w-6 h-6 mr-1" stroke="currentColor">
//                                 {/* Comments icon */}
//                             </svg>
//                             <span>{comments.length}</span>
//                         </div>
//                         {showCommentsModal && (
//                             <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
//                                 <div className="bg-white rounded-lg p-4 w-3/4">
//                                     <div className="flex justify-between mb-4">
//                                         <h2 className="text-lg font-semibold">Comments</h2>
//                                         <button onClick={handleHideComments} className="text-blue-500 hover:text-blue-700">Close</button>
//                                     </div>
//                                     <div className="overflow-y-auto max-h-80">
//                                         {renderComments()}
//                                     </div>
//                                     {/* Input area for new comment */}
//                                     <div className="mt-4">
//                                         <input type="text" value={newCommentContent} onChange={(e) => setNewCommentContent(e.target.value)} placeholder="Add a comment..." className="w-full border rounded-md py-2 px-3" />
//                                         <button onClick={handleCreateComment} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Post</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Post;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaUserPlus, FaUserMinus } from 'react-icons/fa';

const Post = ({ post }) => {
    const user = useSelector((state) => state.auth.user);
    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
    const [isFriend, setIsFriend] = useState(user.friends.includes(post.userId));
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [newCommentContent, setNewCommentContent] = useState('');
    const [comments, setComments] = useState(post.comments);
    const [replyingTo, setReplyingTo] = useState(null); // Keep track of the comment being replied to
    const token = localStorage.getItem('token');

    const handleClickLike = async () => {
        try {
            const url = `http://localhost:5555/api/post/${post._id}/like`;
            const response = await axios.patch(url, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setIsLiked(!isLiked);
                setLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1);
            }
        } catch (error) {
            console.error('Error liking the post:', error);
        }
    };

    const handleAddRemoveFriend = async () => {
        try {
            const url = `http://localhost:5555/api/user/${user._id}/${post.userId}`;
            const response = await axios.patch(url, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setIsFriend(!isFriend);
            }
        } catch (error) {
            console.error('Error adding/removing friend:', error);
        }
    };

    const buttonStyle = {
        color: 'black',
        cursor: 'pointer',
        marginLeft: '5px',
    };

    const formattedDate = new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const ms = Date.now() - new Date("2024-04-14T20:17:27.310Z");
    const hrs = ms / 36e5;
    const timeAgo = hrs < 24 ? `${Math.round(hrs)} hr` : hrs < 168 ? `${Math.round(hrs / 24)} d` : hrs < 720 ? `${Math.round(hrs / 168)} w` : hrs < 8760 ? `${Math.round(hrs / 720)} mo` : `${Math.round(hrs / 8760)} yr`;

    const handleShowComments = () => {
        setShowCommentsModal(true);
    };

    const handleHideComments = () => {
        setShowCommentsModal(false);
        setReplyingTo(null);
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5555/api/post/${post._id}/comments`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setComments(response.data.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        if (showCommentsModal) {
            fetchComments();
        }
    }, [showCommentsModal]);

    const handleCreateComment = async () => {
        try {
            const response = await axios.post(`http://localhost:5555/api/post/${post._id}/comment`, {
                content: newCommentContent,
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                parentId: replyingTo ? replyingTo._id : null,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNewCommentContent('');
            setReplyingTo(null);
            fetchComments();
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    const handleReply = (comment) => {
        setReplyingTo(comment);
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    // const renderComments = (parentId = null, depth = 0) => {
    //     const filteredComments = comments.filter(comment => comment.parentId === parentId);

    //     if (filteredComments.length === 0) {
    //         return null;
    //     }

    //     return filteredComments.map(comment => (
    //         <div key={comment._id} className={`bg-gray-200 p-2 rounded-md mb-2 ${depth > 0 ? `ml-${depth * 2}` : ''} ${replyingTo === comment ? 'border-l-2 border-blue-500 pl-2' : ''}`}>
    //             <b><p className="text-black">{comment.firstName} {comment.lastName}</p></b>
    //             <p className="text-gray-800">{comment.content}</p>
    //             <button onClick={() => handleReply(comment)} className="text-blue-500 text-sm">Reply</button>
    //             {renderComments(comment._id, depth + 1)}
    //         </div>
    //     ));
    // };
    const renderComments = (parentId = null, depth = 0) => {
        const filteredComments = comments.filter(comment => comment.parentId === parentId);
    
        if (filteredComments.length === 0) {
            return null;
        }
    
        return filteredComments.map(comment => (
            <div key={comment._id} className={`bg-gray-200 p-2 rounded-md mb-2 ${depth > 0 ? `ml-${depth * 2}` : ''} ${replyingTo === comment ? 'border-l-2 border-blue-500 pl-2' : ''}`}>
                <b><p className="text-black">{comment.firstName} {comment.lastName}</p></b>
                <p className="text-gray-800">{comment.content}</p>
                <button onClick={() => handleReply(comment)} className="text-blue-500 text-sm">Reply</button>
                {/* Add white space between comments and replies */}
                <div style={{ marginTop: '10px' }} />
                {renderComments(comment._id, depth + 1)}
            </div>
        ));
    };
    

    return (
        <div className="flex bg-blue-300 shadow-lg rounded-lg mx-4 md:mx-auto my-56 max-w-md md:max-w-2xl">
            <div className="flex items-start px-4 py-6">
                <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" alt="avatar" />
                <div className="">
                    <div className="flex items-center ">
                        <h2 className="text-lg font-semibold text-gray-900 -mt-1">{post.firstName + " " + post.lastName} </h2>
                        <button style={{ color: 'black', cursor: 'pointer', marginLeft: '5px' }} onClick={handleAddRemoveFriend}>
                            {isFriend ? <FaUserMinus /> : <FaUserPlus />}
                        </button>
                    </div>
                    <p className="text-gray-700">{formattedDate} </p>
                    <img src={post.picturePath} alt="postPic" />
                    <p className="mt-3 text-gray-700 text-sm">{post.description}</p>
                    <div className="mt-4 flex items-center">
                        <div style={{ marginRight: '10px' }}>
                            <svg fill={isLiked ? 'red' : 'none'} viewBox="0 0 24 24" className="w-6 h-6 mr-1 cursor-pointer" onClick={handleClickLike} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{likes}</span>
                        </div>
                        <div style={{ marginRight: '10px' }} className="cursor-pointer" onClick={handleShowComments}>
                            <svg fill="none" viewBox="0 0 24 24" className="w-6 h-6 mr-1" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                            <span>{comments.length}</span>
                        </div>
                        {showCommentsModal && (
                            <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white rounded-lg p-4 w-3/4">
                                    <div className="flex justify-between mb-4">
                                        <h2 className="text-lg font-semibold">Comments</h2>
                                        <button onClick={handleHideComments} className="text-blue-500 hover:text-blue-700" > Close</button>
                                    </div>
                                    <div className="overflow-y-auto max-h-80">
                                        {renderComments()}
                                    </div>
                                    <div className="mt-4">
                                        <input type="text" value={newCommentContent} onChange={(e) => setNewCommentContent(e.target.value)} placeholder="Add a comment..." className="w-full border rounded-md py-2 px-3" />
                                        <button onClick={handleCreateComment} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Post</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;

