import React from 'react';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const Profile = () => {

  

  return (
    <div>
    <Navbar />  
    <SearchBar />
    <h1>Profile page</h1>
    </div>
  )
}

export default Profile;