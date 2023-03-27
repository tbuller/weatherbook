import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../../redux/usersSlice';
import Navbar from '../Navbar';
import SearchBar from './SearchBar';
import MyProfile from './MyProfile';

const Profile = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);

  const [viewMyProfile, setViewMyProfile] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => dispatch(setUsers(data.users)))
  }, [])

  const handleProfileClick = () => {
    setViewMyProfile(!viewMyProfile);
  }

  return (
    <div>
    <Navbar /> 
    <button onClick={handleProfileClick}>Switch</button> 
    {viewMyProfile ? <MyProfile /> : <SearchBar users={users} />}
    </div>
  )
}

export default Profile;