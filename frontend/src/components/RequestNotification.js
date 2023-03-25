import React from 'react';
import { useState, useEffect } from 'react';
import UserInfo from './UserInfo';
import '../styling/RequestNotification.scss';

const RequestNotification = ({ requests, users, loggedInUser }) => {

  const [showRequester, setShowRequester] = useState(false);
  const [viewedRequester, setViewedRequester] = useState({});

  const acceptRequest = (requesterId) => {
    fetch("http://localhost:8080/users/acceptrequest", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ requesterId: requesterId, requestedId: localStorage.getItem("userId") })
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  const viewUser = (user) => {
    setShowRequester(!showRequester);
    setViewedRequester(user);
  }

  const goBack = () => {
    setShowRequester(!showRequester);
    setViewedRequester({});
  }

  return (
    <div className="request-notification-page-container">
    {!showRequester ? <div>
    {requests.map(r => {
      const requester = users.find(u => u._id === r)
      return (
      <div className="request-container" key={requester._id}>
      <img src={requester.photo || "/blank-photo.webp"} alt="profile-photo" className="profile-photo" />  
      <div className="requester-username" onClick={() => viewUser(requester)}>{requester.username}</div>
      <button className="accept-request-button" onClick={() => acceptRequest(requester._id)}>{loggedInUser.friends.includes(requester._id) ? "Request accepted" : "Accept Request"}</button>  
      </div>
      )
      })}    
    </div> : 
    <div>
    <button onClick={goBack}>Go back to notifications</button>
    <UserInfo user={viewedRequester} />  
    </div>
    }
    </div>
  )
}

export default RequestNotification;