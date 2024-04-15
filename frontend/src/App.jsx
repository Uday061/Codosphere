import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { authActions } from './store/slices/authSlice.jsx';
import { useEffect } from 'react';
import Login from './pages/Login.jsx';

export default function App() {
  const dispatch = useDispatch();
  const isLogged = (state) => {
    return state.auth.isLogged;
  }
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(authActions.login());
    }
  }, [])
  return (
    <div>
     <Router>
      
        <Routes>
          <Route exact path='/login' element={<Login />}></Route>
       
       
     
        </Routes>
        
      </Router>


    </div>
  )
}
