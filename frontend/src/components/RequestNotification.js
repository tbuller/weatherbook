import React from 'react';
import { useState, useEffect } from 'react';
import '../styling/RequestNotification.scss';

const RequestNotification = ({ requests, users, loggedInUser }) => {

  // const showRequests = () => {
  //   console.log(requests);
  // }

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

  return (
    <div>
    {requests.map(r => {
      const requester = users.find(u => u._id === r)
      return (
      <div className="request-container" key={requester._id}>
      <img src={requester.photo || "/blank-photo.webp"} alt="profile-photo" className="profile-photo" />  
      <div className="requester-username">{requester.username}</div>
      <button className="accept-request-button" onClick={() => acceptRequest(requester._id)}>{loggedInUser.friends.includes(requester._id) ? "Request accepted" : "Accept Request"}</button>  
      </div>
      )
      })}    
    </div>
  )
}

export default RequestNotification;