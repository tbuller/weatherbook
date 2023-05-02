import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setSelectedUser, setLoggedInUser } from '../../redux/usersSlice';
import UserInfo from '../Profile/UserInfo';
import '../../styling/RequestNotification.scss';

const RequestNotification = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const loggedInUser = useSelector(state => state.users.loggedInUser);

  const [showRequester, setShowRequester] = useState(false);
  const [viewedRequester, setViewedRequester] = useState({});

  useEffect(() => {
    console.log("logged in under:", loggedInUser);
  }, [loggedInUser])

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
        console.log(data.users);
        console.log(data.users.find(u => u._id === localStorage.getItem("userId")));
        dispatch(setUsers(data.users));
        dispatch(setLoggedInUser(data.users.find(u => u._id === localStorage.getItem("userId"))));
      })
  }

  const viewUser = (user) => {
    setShowRequester(!showRequester);
    dispatch(setSelectedUser(user));
  }

  const goBack = () => {
    setShowRequester(!showRequester);
    dispatch(setSelectedUser({}));
  }

  const show = () => {
    console.log(loggedInUser);
    console.log(users);
  }

  return (
    <div className="request-notification-page-container">
    {!showRequester ? <div>
    {loggedInUser?.requests?.map(r => {
      const requester = users.find(u => u._id === r);
      return (
      <div className="request-container" key={requester._id}>
      <img src={requester.photo || "/blank-photo.webp"} alt="profile-photo" className="profile-photo" onClick={() => viewUser(requester)} />  
      <div className="requester-username" onClick={() => viewUser(requester)}>{requester.username}</div>
      <button className="accept-request-button" onClick={() => acceptRequest(requester._id)}>{loggedInUser.friends.includes(requester._id) ? "Request accepted" : "Accept Request"}</button>  
      </div>
      )
      })}      
    </div> : 
    <div>
    <button className="go-back-button" onClick={goBack}>Go back to notifications</button>
    <UserInfo />  
    </div>
    }
    </div>
  )
}

export default RequestNotification;