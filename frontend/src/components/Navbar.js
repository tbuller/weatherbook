import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/Navbar.scss';

const Navbar = () => {

  const navigate = useNavigate();

  return (
  <span className="navbar-container">
  <button className="nav-home" onClick={() => navigate("/myhome")}>Home</button>
  <button className="nav-profile" onClick={() => navigate("/profile")}>Profile</button>
  <button className="nav-notifications" onClick={() => navigate("/notifications")}>Notifications</button>
  <button className="nav-messages" onClick={() => navigate("/messages")}>Messages</button>
  </span>
  )
  
}

export default Navbar;