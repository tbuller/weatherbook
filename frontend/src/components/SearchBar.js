import React from 'react';
import { useState, useEffect } from 'react';

const SearchBar = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [displayUsers, setDisplayUSers] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => setUsers(data.users))
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="search-bar-container">
    <input className="search-bar" type="text" onChange={handleSearch} />
    {searchTerm.length > 0 && (
      <ul>
          {users.filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(i => (
            <li key={i._id}>{i.username}</li>
          ))
          }
      </ul>
    )}
    </div>
  )
}

export default SearchBar;