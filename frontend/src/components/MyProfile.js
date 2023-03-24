import React from 'react';
import { useState, useEffect } from 'react';
import '../styling/MyProfile.scss';

const MyProfile = () => {

  const [users, setUsers] = useState([]);
  const [from, setFrom] = useState("");
  const [aboutMe, setABoutMe] = useState("");
  const [photo, setPhoto] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => {
        setUsers(data.users);
        data.users.map(u => u._id === localStorage.getItem("userId") ? setLoggedInUser(u) : null);
      })
  }, [])

  const updateFrom = (event) => {
    fetch("http://localhost:8080/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ from: from, userId: localStorage.getItem("userId") })
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  const updateAboutMe = () => {
    fetch("http://localhost:8080/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ aboutMe: aboutMe, userId: localStorage.getItem("userId") })
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  const handleFrom = (event) => {
    setFrom(event.target.value);
  }

  const handleAboutMe = (event) => {
    setABoutMe(event.target.value);
  }

  const handlePhoto = (event) => {
    setPhoto(event.target.files[0]);
  }
  
  const showLoggedInUser = () => {
    console.log(loggedInUser);
  }

  return (
    <div>
    <h1>My profile</h1>
    <div className="myprofile-info-container">{users.filter(u => u._id === localStorage.getItem("userId"))
         .map(u => <div key={u._id}>
         <div>{u.username}</div>
         <div>{u.email}</div>
         </div>
         )}
    </div>
    <div className="add-profile-info-container">
    <span className="add-photo-container">
    <label className="add-profile-info-label">Add an image</label>
    <input type="file" onChange={handlePhoto} />     
    </span>  
    {!loggedInUser.from ? <span className="from-container">
    <label className="add-profile-info-label">Tell others where you are from</label>  
    <input className="add-profile-info-input-from" type="text" onChange={handleFrom} />
    <button className="add-profile-info-button" onClick={updateFrom}>Add info to profile</button>
    </span> : <div>{loggedInUser.from}</div>}
    {!loggedInUser.aboutMe ? <span className="aboutme-container">
    <label className="add-profile-info-label">Add some more information about yourself</label>
    <input className="add-profile-info-input-aboutme" type="text" onChange={handleAboutMe} />
    <button className="add-profile-info-button" onClick={updateAboutMe}>Add info to profile</button>
    </span> : <div>{loggedInUser.aboutMe}</div>}
    </div>
    <button onClick={showLoggedInUser}>show logged in user</button>
    </div>
  )
}

export default MyProfile;