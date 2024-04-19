import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Post from '../components/Post';

const Home = () => {
    const state = useSelector((state) => state.auth);
    const [friends, setFriends] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchFriendsPosts = async () => {
            if (state.jwtToken) {
                try {
                    const friendPosts = [];
                    for (let i = 0; i < friends.length; i++) {
                        const friendId = friends[i];
                        const response = await axios.get(`http://localhost:5555/api/post/${friendId}/posts`, {
                            headers: {
                                Authorization: state.jwtToken,
                            }
                        });
                        friendPosts.push(...response.data); // Assuming the response contains posts data
                    }
                    setPosts(friendPosts);
                } catch (error) {
                    console.error('Error fetching friends posts:', error);
                }
            }
        };

        fetchFriendsPosts();
    }, []);

    

    return (
        <div>
            {/* Render posts */}
            {posts.map(post => (
                <div key={post.id} >
                    {/* Render each post */}
                    <Post post={post}/>
                </div>
            ))}
        </div>
    );
};

export default Home;
