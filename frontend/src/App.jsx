import React from 'react'
import Navbar from './componenets/Navbar/Navbar.jsx';
import Home from './componenets/Home/Home.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
