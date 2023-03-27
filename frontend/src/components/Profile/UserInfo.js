import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../../redux/usersSlice';
import { AiOutlinePlus } from 'react-icons/ai';



const UserInfo = ({ user }) => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);

  const [currentUser, setCurrentUser] = useState(user);
  const [mounted, setMounted] = useState(false);

  const showUser = () => {
    console.log(currentUser);
  }

  useEffect(() => {
    setCurrentUser(user);
  }, [user])

  const addConnection = () => {
    fetch("http://localhost:8080/users/request", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ requesterId: localStorage.getItem("userId"), requestedId: currentUser._id })        
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setUsers(data.users));
        setCurrentUser(data.user);
        console.log(data);
      })
  }

  return (
    <div>
    {currentUser && 
    <div>
    <div>{currentUser.username}</div>
    <div>{currentUser.email}</div>
    {currentUser.requests?.includes(localStorage.getItem("userId")) ? <button>Friend request sent</button> : <button onClick={addConnection}>Connect with {currentUser.username} <AiOutlinePlus className="plus-icon" /></button>}
    </div>}
    <button onClick={showUser}>show user</button>
    </div>
  )
}

export default UserInfo;