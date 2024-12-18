import React, { useState } from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";

const Navbar = ({  }) => {

  return (
    <div className="Navbar">
      <div className="container">
        <div className="logo">
          
          <h1>Wallets</h1>
        </div>
        <div className="searching">
          <input
            type="text"
            className="form-control"
            placeholder="Search on wallets"
          />
          
        </div>
        <li>
          <Link to="/home">
            
            <a href="">Home</a>
            
          </Link>
        </li>
        <li>
          <Link to="/transaction">
           
            <a href="">Transactions</a>
            
          </Link>
        </li>
        <li>
          <Link to="/wallets">
            
            <a href="">Wallets</a>
            
          </Link>
        </li>
        
        <li>
          <Link to="/profile">
            
            Profile
          </Link>
        </li>
        
        <li>Ishika Garg</li>
        <div className="nav-login-cart">
                {localStorage.getItem("auth-Token") ? (
                  <button
                    onClick={() => {
                      localStorage.removeItem("auth-Token"); 
                      window.location.replace("/"); 
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login">
                    <button>Login</button>
                  </Link>
                )}
              </div>
      </div>
      
      
    </div>
  );
};

export default Navbar;

