import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser, setSelectedUser } from '../../redux/usersSlice';
import { setUsers } from '../../redux/usersSlice';
import { AiOutlinePlus } from 'react-icons/ai';
import Poke from '../Notifications/Poke';
import '../../styling/UserInfo.scss';

const UserInfo = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const loggedInUser = useSelector(state => state.users.loggedInUser);
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
      })
  }

  const acceptRequest = (requesterId) => {
    fetch("http://localhost:8080/users/acceptrequest", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ requesterId: requesterId, requestedId: localStorage.getItem("userId") })
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setUsers(data.users));
        dispatch(setLoggedInUser(data.requestedUser));
        dispatch(setSelectedUser(data.requesterUser));
        console.log(data);
      })
  }

  return (
    <div>
    {selectedUser && 
    <div className="user-info-container">
    <img className="profile-photo user-info-photo" src={selectedUser.photo || "/blank-photo.webp"} />
    <div>{selectedUser.username}</div>
    <div>{selectedUser.email}</div>
    {selectedUser.friends?.includes(loggedInUser._id) ? <button>Friends</button> : selectedUser.requests?.includes(loggedInUser._id) ?  <button>Friend request sent</button> : loggedInUser.requests?.includes(selectedUser._id) ? <button onClick={() => acceptRequest(selectedUser._id)}>Accept request</button> : <button onClick={addConnection}>Connect with {selectedUser.username} <AiOutlinePlus className="plus-icon" /></button>}
    </div>}
    <Poke />
    </div>
  )
}

export default UserInfo;