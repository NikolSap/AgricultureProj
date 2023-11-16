import { useState,useEffect } from 'react'
import React from 'react';
import { BrowserRouter as Router, Route, Routes ,Link} from 'react-router-dom';
import './App.css'
import AgriculturalPage from './components/AgriculturalPage.jsx';
import VolunteerPage from './components/VolunteerPage.jsx';
import Register from './components/Register.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import ChatRoom from './components/ChatRoom.jsx';
import About from './components/About.jsx'
import Header from './components/innerComponents/Header.jsx';
import Footer from './components/innerComponents/Footer.jsx';


function App() {
 
  return (
    <div>

    <Header/>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/AgriculturalPage" element={<AgriculturalPage />} />
        <Route path="/VolunteerPage" element={<VolunteerPage />} />

        <Route path="/ChatRoom" element={<ChatRoom />}/>
        <Route path="/About" element={<About />}/>
      </Routes>
    </Router>
    <Footer/>
    </div>

   
  );
}

export default App;
