import React from 'react';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import MyProfile from './MyProfile';

const Profile = () => {

  const [viewMyProfile, setViewMyProfile] = useState(true);

  const handleProfileClick = () => {
    setViewMyProfile(!viewMyProfile);
  }

  return (
    <div>
    <Navbar /> 
    <button onClick={handleProfileClick}>Switch</button> 
    {viewMyProfile ? <MyProfile /> : <SearchBar />}
    </div>
  )
}

export default Profile;