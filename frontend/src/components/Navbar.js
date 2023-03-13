import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  return (
  <span className="navbar-container">
  <button className="nav-home">Home</button>
  <button className="nav-profile">Profile</button>
  <button className="nav-notifications">Notifications</button>
  <button className="nav-messages">Messages</button>
  </span>
  )
  
}

export default Navbar;