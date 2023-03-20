import React from 'react';
import { useState, useEffect } from 'react';

const SearchBar = () => {

  const [displayUsers, setDisplayUSers] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => setUsers(data.users))
  }, [])

  return (
    <div className="search-bar-container">
    <input className="search-bar" type="text" />
    </div>
  )
}

export default SearchBar;