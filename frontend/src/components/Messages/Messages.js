import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setLoggedInUser } from '../../redux/usersSlice';
import Navbar from '../Navbar';
import Chat from'./Chat';

const Messages = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const loggedInUser = useSelector(state => state.users.loggedInUser);

  const [showFriends, setShowFriends] = useState(false);
  const [chosenFriend, setChosenFriend] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => {
        dispatch(setUsers(data.users));
        dispatch(setLoggedInUser(data.users.find(u => u._id === localStorage.getItem("userId"))));
      })
  }, [])

  const createChat = () => {
    fetch("http://localhost:8080/chats", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({  })
    })
  }

  const handleSelection = (event) => {
    setChosenFriend(event.target.value);
  }

  return (
    <div>
    <Navbar />
    <select id="users" value={chosenFriend} onChange={handleSelection}>
    {loggedInUser && loggedInUser.friends.map(f => {
      return (
      <option key={f._id} value={f._id}>{f.username}</option>
      )
    }
      )}  
    </select>
    </div>
  )
}

export default Messages;