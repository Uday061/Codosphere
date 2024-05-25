import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';




const Post = (props) => {
    const user = useSelector((state) => state.auth.user);
    const [likes, setLikes] = useState(props.post.likes.length || 0);
    const [isLiked, setIsLiked] = useState(false);
    const token = localStorage.getItem('token');
    // console.log('Token:', token);
    const handleClickLike = async () => {
        try {
       
        // console.log(props.post._id);
          const url = `http://localhost:5555/api/post/${props.post._id}/like`;
         
          const response = await axios.patch(url,{},{
            headers: {
              Authorization:`Bearer ${token}` // Attach JWT token to the request
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

      const buttonStyle = {
        color: isLiked ? 'red' : 'black',
        cursor: 'pointer',
        // padding: '10px 20px',
        // border: '1px solid black',
        backgroundColor: 'white',
        // borderRadius: '5px',
      };
     
 
    const formattedDate = new Date(props.post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    const ms = Date.now() - new Date("2024-04-14T20:17:27.310Z");
    const hrs = ms / 36e5;
    const timeAgo = hrs < 24 ?
        `${Math.round(hrs)} hr` :
        hrs < 168 ?
            `${Math.round(hrs / 24)} d ` :
            hrs < 720 ?
                `${Math.round(hrs / 168)} w` :
                hrs < 8760 ?
                    `${Math.round(hrs / 720)} mo` :
                    `${Math.round(hrs / 8760)} yr`;
    return (
         
        <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-56 max-w-md md:max-w-2xl ">
            <div className="flex items-start px-4 py-6">
                <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar" />
                <div className="">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 -mt-1">{props.post.firstName + " " + props.post.lastName} </h2>
                        <small className="text-sm text-gray-700">{timeAgo}</small>
                    </div>
                    <p className="text-gray-700">{formattedDate} </p>
                    <div> <img src={props.post.picturePath} alt="postPic" /></div>
                    <p className="mt-3 text-gray-700 text-sm">
                        {props.post.description}
                    </p>
                    <div className="mt-4 flex items-center">
                    <div className="flex mr-2 text-gray-700 text-sm mr-3">
                            <div style={buttonStyle} onClick={handleClickLike}>
                                <svg fill={isLiked ? 'red' : 'none'} viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <span>{likes}</span>
                        </div>
                        <div className="flex mr-2 text-gray-700 text-sm mr-8">
                            <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                            <span>{props.post.comments.length}</span>
                        </div>
                        <div className="flex mr-2 text-gray-700 text-sm mr-4">
                            <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span>share</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
