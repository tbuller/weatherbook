import React from 'react';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import RequestNotification from './RequestNotification';
import PokeNotification from './PokeNotification';

const Notifications = () => {

  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => {
        setUsers(data.users);
        data.users.map(u => u._id === localStorage.getItem("userId") ? setLoggedInUser(u) : null);
      })
  }, [])

  const showLoggedIn = () => {
    console.log(loggedInUser);
  }

  return (
    <div>
    <Navbar />
    <h1>Your Notifications</h1>
    <div>
    {loggedInUser && loggedInUser?.requests?.length > 0 && <RequestNotification requests={loggedInUser.requests} users={users} />}  
    <button onClick={showLoggedIn}>show logged in</button>
    </div>
    </div>
  )
}

export default Notifications;