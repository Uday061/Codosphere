import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { authActions } from './store/slices/authSlice.jsx';
import { useEffect } from 'react';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Post from './components/Post.jsx';
import CreatePostForm from './components/CreatePostForm.jsx';
import Home from './pages/Home.jsx';
import axios from 'axios';
import Dashboard from './pages/Dashboard.jsx';
import ChatPage from './pages/ChatPage.jsx';
import CodeEditor from './components/CodeEditor.jsx';



export default function App() {
  const dispatch = useDispatch();
  const isLogged = (state) => {
    return state.auth.isLogged;
  }
  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (token) {
  //     dispatch(authActions.login());
  //   }
  // }, [])

  // const [userData, setUserData] = useState(null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get JWT token from local storage (assuming it's stored there after login)
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No token found');
        }

        // Make API call to backend to get user data
        const response = await axios.get('http://localhost:5555/api/user/getUserByjwt', {
          headers: {
            Authorization: `Bearer ${token}` // Attach JWT token to the request
          }
        });

        // setUserData(response.data);
        dispatch(authActions.login({user:response.data}));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div>
     <Router>
      <Navbar></Navbar>
        <Routes>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/post' element={<Post />}></Route>
          <Route exact path='/createPost' element={<CreatePostForm />}></Route>
          <Route exact path='/home' element={<Home/>}></Route>
          <Route exact path='/chat' element={<ChatPage/>}></Route>
          <Route exact path='/dashboard/:id' element={<Dashboard/>}></Route>
          <Route exact path='/codeEditor' element={<CodeEditor/>}></Route>

     
        </Routes>
        
      </Router>


    </div>
  )
}





