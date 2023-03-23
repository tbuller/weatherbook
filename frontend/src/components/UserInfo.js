import React from 'react';
import { useState, useEffect } from 'react';



const UserInfo = (user) => {

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])

  const showUser = () => {
    console.log(user);
  }

  return (
    <div>
    {user && <div>{user.user.username}</div>}
    {user && <div>{user.user.email}</div>}
    {user && <div>user passed down</div>}
    <button onClick={showUser}>show user</button>
    </div>
  )
}

export default UserInfo;