// import { Button } from "antd";

import './App.css';
// import React from "react";
import { BrowserRouter , Routes,Route } from 'react-router-dom';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Navbar from './components/Navbar/Navbar';
import Transactions from './components/Transactions/Transactions';
// import Request from './components/Request/Request';
import Wallets from './components/Wallets/Wallets';
// import {useState} from "react";
function App() {
  
  return (
    <div className="App">
     
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<LoginSignup/>} />
        <Route path="/transaction" element={<Transactions/>}/>
        <Route path="/wallets" element={<Wallets/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
