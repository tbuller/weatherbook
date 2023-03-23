import React from 'react';
import { useState, useEffect } from 'react';

const MyProfile = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => setUsers(data.users))
  }, [])

  return (
    <div>
    <h1>My profile</h1>
    <div>{users.filter(u => u._id === localStorage.getItem("userId"))
         .map(u => <div key={u._id}>{u.username}</div>)}</div>  
    </div>
  )
}

export default MyProfile;