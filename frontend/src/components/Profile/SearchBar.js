import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser, setSelectedUser } from '../../redux/usersSlice';
import '../../styling/SearchBar.scss';
import UserInfo from '../Profile/UserInfo';

const SearchBar = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const loggedInUser = useSelector(state => state.users.loggedInUser);
  const selectedUser = useSelector(state => state.users.selectedUser);

  const [searchTerm, setSearchTerm] = useState("");
  const [displayUsers, setDisplayUSers] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleUserSelection = (id) => {
    dispatch(setSelectedUser(users.find(u => u._id === id)));
  }

  const showLoggedIn = () => {
    console.log(loggedInUser);
  }

  return (
    <div className="search-bar-container">
    <h1 className="search-prompt">Find friends:</h1>
    <button onClick={showLoggedIn}>show logged in</button>
    <input className="search-bar" type="text" onChange={handleSearch} />
    {searchTerm.length > 0 && (
      <ul>
          {users.filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(0, 5)
          .map(i => (
            <li key={i._id} onClick={() => handleUserSelection(i._id)}>{i.username}</li>
          ))
          }
      </ul>
    )}
    {selectedUser && <UserInfo />}
    </div>
  )
}

export default SearchBar;