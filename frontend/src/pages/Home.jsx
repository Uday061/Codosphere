// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import Post from '../components/Post';

// const Home = () => {
//     const state = useSelector((state) => state.auth);
//     const [friends, setFriends] = useState([]);
//     const [posts, setPosts] = useState([]);

//     // useEffect(() => {
//     //     const fetchFriendsPosts = async () => {
//     //         if (state.jwtToken) {
//     //             try {
//     //                 setFriends(state.user.friends);
//     //                 console.log(friends);
//     //                 const friendPosts = [];
//     //                 for (let i = 0; i < friends.length; i++) {
//     //                     const friendId = friends[i];
//     //                     const response = await axios.get(`http://localhost:5555/api/post/${friendId}/posts`, {
//     //                         headers: {
//     //                             Authorization: state.jwtToken,
//     //                         }
//     //                     });
//     //                     friendPosts.push(...response.data); // Assuming the response contains posts data
//     //                 }
//     //                 setPosts(friendPosts);
//     //             } catch (error) {
//     //                 console.error('Error fetching friends posts:', error);
//     //             }
//     //         }
//     //     };

//     //     fetchFriendsPosts();
//     // }, []);

    

//     return (
//         // <div>
//         //     {/* Render posts */}
//         //     {friends && posts.map(post => (
//         //         <div key={post.id} >
//         //             {/* Render each post */}
//         //             <Post post={post}/>
//         //         </div>
//         //     ))}
//         //     {!friends && 
//         //         <div>
//         //             gian
//         //         </div>
//         //     }
//         // </div>
//         <>
//             gian
//         </>
//     );
// };

// export default Home;


// // Homepage.js
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// const [user,setUser] =useState([]);
// const Home= () => {

//   const us = useSelector(state => state.user);
//   if(us)
//   setUser(us);
//   console.log(user)
// // setUser(useSelector(state => state.user));
// if (!user) {
//     return (
//       <div>
//         <h1>Loading...</h1>
//       </div>
//     );
//   }


//   return (
//     <div>
//         welcome
//         {user && <h1>Welcome, {user.firstName}!</h1>}
    
//     </div>
//   );
// };

// export default Home;
