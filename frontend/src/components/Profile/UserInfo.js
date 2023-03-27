import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../../redux/usersSlice';
import { setUsers } from '../../redux/usersSlice';
import { AiOutlinePlus } from 'react-icons/ai';



const UserInfo = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const selectedUser = useSelector(state => state.users.selectedUser);

  const [mounted, setMounted] = useState(false);

  const showUser = () => {
    console.log(selectedUser);
  }

  const addConnection = () => {
    fetch("http://localhost:8080/users/request", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ requesterId: localStorage.getItem("userId"), requestedId: selectedUser._id })        
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setUsers(data.users));
        dispatch(setSelectedUser(data.user));
        console.log(data);
      })
  }

  return (
    <div>
    {selectedUser && 
    <div>
    <div>{selectedUser.username}</div>
    <div>{selectedUser.email}</div>
    {selectedUser.requests?.includes(localStorage.getItem("userId")) ? <button>Friend request sent</button> : <button onClick={addConnection}>Connect with {selectedUser.username} <AiOutlinePlus className="plus-icon" /></button>}
    </div>}
    <button onClick={showUser}>show user</button>
    </div>
  )
}

export default UserInfo;