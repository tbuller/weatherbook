import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../styling/SearchBar.scss';
import UserInfo from '../Profile/UserInfo';

const SearchBar = () => {

  const users = useSelector(state => state.users.users);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [displayUsers, setDisplayUSers] = useState(false);

  useEffect(() => {
    setSelectedUser(users.filter(u => u.username === selectedUser));
  }, [users])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleUserSelection = (username) => {
    // setSelectedUser(username);
    setSelectedUser(users.filter(u => u.username === username));
    console.log(selectedUser);
  }

  return (
    <div className="search-bar-container">
    <h1 className="search-prompt">Find friends:</h1>
    <input className="search-bar" type="text" onChange={handleSearch} />
    {searchTerm.length > 0 && (
      <ul>
          {users.filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(0, 5)
          .map(i => (
            <li key={i._id} onClick={() => handleUserSelection(i.username)}>{i.username}</li>
          ))
          }
      </ul>
    )}
    {selectedUser && <UserInfo user={selectedUser[0]} />}
    </div>
  )
}

export default SearchBar;