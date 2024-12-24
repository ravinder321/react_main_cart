// App.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './Blog/Index'; 
import About from './Blog/About'; 
import Contact from './Blog/Contact';
import Cloths from './Blog/Clothes';
import './App.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<About title="About Us Page" />} /> 
        <Route path="/contact" element={<Contact title="Contact Us Page"  />} />
        <Route path="/cloths" element={<Cloths />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
