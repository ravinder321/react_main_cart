// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route,useParams, BrowserRouter } from 'react-router-dom'; 
import Home from '../Index'; 
import Shop from '../Shop'; 
import Login from '../Login/Login'; 
import Detail from '../Product/single'; 
import Cart from '../Product/addtocart'; 
import Cart_show from '../cart/Cart'; 
import Register from '../Login/Register'; 
import Logout from '../Login/Logout'; 
import Contact from '../Pages/Contact'; 



function App() {
    const { categoryId } = useParams();
    const { productId } = useParams();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/logout" element={<Logout />} /> 
        <Route path="/shop" element={<Shop/>} />
        <Route path="/cart/:productId" element={<Cart/>} />
        <Route path="/cart" element={<Cart_show/>} />
        <Route path="/shop/:categoryId" element={<Shop categoryId={categoryId}/>} />
        <Route path="/product/:productId" element={<Detail productId={productId}/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
