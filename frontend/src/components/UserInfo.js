import React from 'react';
import { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';



const UserInfo = (user) => {

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])

  const showUser = () => {
    console.log(user);
  }

  const addConnection = () => {
    fetch("http://localhost:8080/users/request", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ requesterId: localStorage.getItem("userId"), requestedId: user.user._id })        
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  return (
    <div>
    {user && 
    <div>
    <div>{user.user.username}</div>
    <div>{user.user.email}</div>
    <button onClick={addConnection}>Connect with {user.user.username} <AiOutlinePlus className="plus-icon" /></button>
    </div>}
    <button onClick={showUser}>show user</button>
    </div>
  )
}

export default UserInfo;