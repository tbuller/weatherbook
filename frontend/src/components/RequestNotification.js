import React from 'react';
import { useState, useEffect } from 'react';

const RequestNotification = ({ requests, users }) => {

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
      <div>{requester.username}</div>
      <div>{requester.email}</div>  
      </div>
      )
      })}    
    </div>
  )
}

export default RequestNotification;