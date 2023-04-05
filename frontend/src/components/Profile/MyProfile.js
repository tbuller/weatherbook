import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, updateUser } from '../../redux/usersSlice';
import { setComments } from '../../redux/commentsSlice';
import { setPosts } from '../../redux/postsSlice';
import Posts from '../Posts/Posts';
import '../../styling/MyProfile.scss';

const MyProfile = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const posts = useSelector(state => state.posts.posts);

  const [from, setFrom] = useState("");
  const [aboutMe, setABoutMe] = useState("");
  const [photo, setPhoto] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});

  const findLoggedIn = () => {
    users.map(u => u._id === localStorage.getItem("userId") ? setLoggedInUser(u) : null);
  }

  useEffect(() => {
    findLoggedIn()
  }, [users])

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then(response => response.json())
      .then(data => {
        dispatch(setPosts(data.posts.filter(p => p.posterId === loggedInUser._id)));
      })
  }, [loggedInUser])

  useEffect(() => {
    fetch("http://localhost:8080/comments")
      .then(response => response.json())
      .then(data => {
        dispatch(setComments(data.comments));
      })
  }, [loggedInUser])

  const updateFrom = () => {
    fetch("http://localhost:8080/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ from: from, userId: localStorage.getItem("userId") })
    })
      .then(response => response.json())
      .then(data => dispatch(setUsers(data.users)))
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
      .then(data => {
        dispatch(updateUser(data.user));
      })
  }

  const uploadPhoto = () => {
    fetch("http://localhost:8080/users/uploadphoto", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: loggedInUser._id, photo: photo })
    })
      .then(response => response.json())
      .then(data => {
        dispatch(updateUser(data.user));
      })
  }

  const handleFrom = (event) => {
    setFrom(event.target.value);
  }

  const handleAboutMe = (event) => {
    setABoutMe(event.target.value);
  }

  const handlePhoto = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  }
  
  return (
    <div>
    <h1>My profile</h1>
    <div className="myprofile-info-container">
      {users?.filter(u => u._id === localStorage.getItem("userId"))
         .map(u => <div key={u._id}>
         <div>{u.username}</div>
         <div>{u.email}</div>
         </div>
         )}
    </div>
    <div className="add-profile-info-container">
    {!loggedInUser.photo ? <span className="add-photo-container">
    <label className="add-profile-info-label">Add an image</label>
    <input type="file" onChange={handlePhoto} /> 
    <button onClick={uploadPhoto}>Upload photo</button>    
    </span> : <img src={loggedInUser.photo} alt="profile-photo" className="profile-photo" />}  
    {!loggedInUser.from ? <span className="from-container">
    <label className="add-profile-info-label">Tell others where you are from</label>  
    <input className="add-profile-info-input-from" type="text" onChange={handleFrom} />
    <button className="add-profile-info-button" onClick={updateFrom}>Add info to profile</button>
    </span> : <div>{loggedInUser.from}</div>}
    {!loggedInUser.aboutMe ? <span className="aboutme-container">
    <label className="add-profile-info-label">Add some more information about yourself</label>
    <input className="add-profile-info-input-aboutme" type="text" onChange={handleAboutMe} />
    <button className="add-profile-info-button" onClick={updateAboutMe}>Add info to profile</button>
    </span> : <div className="about-me-text">{loggedInUser.aboutMe}</div>}
    </div>
    {loggedInUser && users && posts && <Posts />}
    </div>
  )
}

export default MyProfile;