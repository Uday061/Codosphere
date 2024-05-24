import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import Post from '../components/Post';
import CreatePostForm from '../components/CreatePostForm';

const Home = () => {
    const token = localStorage.getItem('token');
    const state = useSelector((state) => state.auth);
    const [friends, setFriends] = useState([]);
    const [posts, setPosts] = useState([]);


    const user = useSelector((state) => state.auth.user);



    useEffect(() => {
        const getAllPost = async () => {
            for (let i = 0; i < user.friends.length; i++) {
                const fid = user.friends[i];
                try {
                    const url = `http://localhost:5555/api/post/${fid}/posts`;
                    const response = await axios.get(url,{
                        headers: {
                          Authorization: `Bearer ${token}` // Attach JWT token to the request
                        }
                      });
                      console.log(response.data)

                    setPosts(...posts, response.data);


                } catch (err) {
                    console.log(err);

                }
            }
        }
        getAllPost();
        console.log(posts)
    }, [user]);




    return (
        // <div>
        //     {/* Render posts */}
        //     {friends && posts.map(post => (
        //         <div key={post.id} >
        //             {/* Render each post */}
        //             <Post post={post}/>
        //         </div>
        //     ))}
        //     {!friends && 
        //         <div>
        //             gian
        //         </div>
        //     }
        // </div>
        <>
            {!user && <h2>Loading...</h2>}
            {user && <h1>Welcome {user.firstName} {user.lastName}</h1>}

            <CreatePostForm></CreatePostForm>
            <Post></Post>
        </>
    );
};

export default Home;



