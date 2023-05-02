import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/Navbar.scss';

const Navbar = () => {

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/myhome") {
      setCurrentPage("myhome");
    } else if (path === "/profile") {
      setCurrentPage("profile");
    } else if (path === "/notifications") {
      setCurrentPage("notifications");
    } else if (path === "/messages") {
      setCurrentPage("messages");
    }
  })

  return (
  <span className="navbar-container">
  <button className="log-out-nav-button" onClick={() => navigate("/")}>Log out</button>
  <button className={currentPage === "myhome" ? "nav-selected" : "nav-myhome"} onClick={() => navigate("/myhome")}>Home</button>
  <button className={currentPage === "profile" ? "nav-selected" : "nav-profile"} onClick={() => navigate("/profile")}>Profile</button>
  <button className={currentPage === "notifications" ? "nav-selected" : "nav-notifications"} onClick={() => navigate("/notifications")}>Notifications</button>
  <button className={currentPage === "messages" ? "nav-selected" : "nav-messages"} onClick={() => navigate("/messages")}>Messages</button>
  </span>
  )
  
}

export default Navbar;