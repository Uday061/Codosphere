// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux'
// import Post from '../components/Post';
// import CreatePostForm from '../components/CreatePostForm';

// const Home = () => {
//     const token = localStorage.getItem('token');
//     const state = useSelector((state) => state.auth);
//     const [friends, setFriends] = useState([]);
//     const [posts, setPosts] = useState([]);


//     const user = useSelector((state) => state.auth.user);

    
//     {
        
//         useEffect(() => {
//             const getAllPost = async () => {
//                 for (let i = 0; i < user.friends.length; i++) {
//                     const fid = user.friends[i];
//                     try {
//                         const url = `http://localhost:5555/api/post/${fid}/posts`;
//                         const response = await axios.get(url, {
//                             headers: {
//                                 Authorization: `Bearer ${token}` // Attach JWT token to the request
//                             }
//                         });
//                         console.log(response.data)

//                         setPosts(...posts, response.data);
//                         //console.log(posts);


//                     } catch (err) {
//                         console.log(err);

//                     }
//                 }
//             }
//             getAllPost();
//             console.log("Here i clg posts -->", posts);
//         }, [user]);
//     }




//     return (
//         <>
//             <>
//                 {!user && <h2>Loading...</h2>}
//                 {user && <h1>Welcome {user.firstName} {user.lastName}</h1>}

//                 <CreatePostForm></CreatePostForm>

//             </>
//             <div>
//                 {/* Render posts */}
//                 {posts && posts.map(post => (
//                     <div key={post.id} >
//                         {/* Render each post */}
//                         <Post post={post} />
//                     </div>
//                 ))}
//                 {!friends &&
//                     <div>
//                         gian
//                     </div>
//                 }
//             </div>

//         </>
//     );
// };

// export default Home;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Post from '../components/Post';
import CreatePostForm from '../components/CreatePostForm';
import { ClipLoader } from 'react-spinners';

const Home = () => {
    const token = localStorage.getItem('token');
    const user = useSelector((state) => state.auth.user);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllPost = async () => {
            try {
                setLoading(true);
                let allPosts = [];
                for (let i = 0; i < user.friends.length; i++) {
                    const fid = user.friends[i];
                    const url = `http://localhost:5555/api/post/${fid}/posts`;
                    const response = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${token}` // Attach JWT token to the request
                        }
                    });
                    allPosts = allPosts.concat(response.data);
                }
                setPosts(allPosts);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        if (user && user.friends.length > 0) {
            getAllPost();
        } else {
            setLoading(false);
        }
    }, [user, token]);

    return (
        <>
            {!user && (
                <div className="flex items-center justify-center min-h-screen">
                    <ClipLoader color="#00008B" loading={loading} size={100} />
                </div>
            )}
            {user && <h1>Welcome {user.firstName} {user.lastName}</h1>}
            <CreatePostForm />
            <div>
                {/* Render posts */}
                {loading ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <ClipLoader color="#00008B" loading={loading} size={100} />
                    </div>
                ) : (
                    posts.map(post => (
                        <div key={post.id}>
                            <Post post={post} />
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default Home;







