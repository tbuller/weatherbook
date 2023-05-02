import React from 'react';
import { useState, useEffect } from 'react';
import '../styling/Landing.scss';

const Landing = ({ navigate }) => {

  const handleNavigateLogin = () => {
    navigate("/login");
  }

  const handleNavigateSignup = () => {
    navigate("/signup");
  }

  return (
    <div className="landing-page-container">
      <h1 className="landing-welcome">Welcome to Weatherbook</h1>
      <h3 className="landing-prompt">Log in or sign up to continue</h3>
      <button className="landing-page-button" onClick={handleNavigateLogin}>Log in</button>
      <button className="landing-page-button" onClick={handleNavigateSignup}> Sign up</button>
    </div>
  )
} 

export default Landing;