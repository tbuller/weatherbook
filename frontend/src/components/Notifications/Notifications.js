import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setLoggedInUser } from '../../redux/usersSlice';
import Navbar from '../Navbar';
import RequestNotification from './RequestNotification';
import PokeNotification from './PokeNotification';

const Notifications = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const loggedInUser = useSelector(state => state.users.loggedInUser);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => {
        dispatch(setUsers(data.users));
        data.users.find(u => u._id === localStorage.getItem("userId") ? dispatch(setLoggedInUser(u)) : null);
      })
  }, [])

  const showLoggedIn = () => {
    console.log(loggedInUser);
  }

  return (
    <div>
    <Navbar />
    <div>
    {loggedInUser && loggedInUser?.requests?.length > 0 && <RequestNotification />}  
    <button onClick={showLoggedIn}>show logged in</button>
    </div>
    </div>
  )
}

export default Notifications;