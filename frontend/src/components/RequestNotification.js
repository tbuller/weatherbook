import React from 'react';
import { useState, useEffect } from 'react';

const RequestNotification = ({ requests, users }) => {

  // const showRequests = () => {
  //   console.log(requests);
  // }

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