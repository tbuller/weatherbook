import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setLoggedInUser } from '../../redux/usersSlice';
import { setPosts } from '../../redux/postsSlice';
import Navbar from '../Navbar';
import SearchBar from './SearchBar';
import MyProfile from './MyProfile';
import '../../styling/Profile.scss';

const Profile = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);

  const [viewMyProfile, setViewMyProfile] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => {
        dispatch(setUsers(data.users));
        dispatch(setLoggedInUser(data.users.find(u => u._id === localStorage.getItem("userId"))));
      })
  }, [])

  const handleProfileClick = () => {
    setViewMyProfile(!viewMyProfile);
  }

  return (
    <div className="all-profile-container">
    <Navbar /> 
    <button className="profile-toggle-button" onClick={handleProfileClick}>{viewMyProfile ? "Search for friends" : "Go back to my profile"}</button> 
    {viewMyProfile ? <MyProfile /> : <SearchBar />}
    </div>
  )
}

export default Profile;