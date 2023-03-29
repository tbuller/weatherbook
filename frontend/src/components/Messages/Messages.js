import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setLoggedInUser } from '../../redux/usersSlice';
import { setChats, addChat } from '../../redux/chatsSlice';
import Navbar from '../Navbar';
import SideBar from './SideBar';
import Chat from'./Chat';

const Messages = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const loggedInUser = useSelector(state => state.users.loggedInUser);
  const chats = useSelector(state => state.chats.chats);

  const [chosenFriend, setChosenFriend] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => {
        dispatch(setUsers(data.users));
        dispatch(setLoggedInUser(data.users.find(u => u._id === localStorage.getItem("userId"))));
      })
  }, [])

  useEffect(() => {
    fetch("http://localhost:8080/chats")
      .then(response => response.json())
      .then(data => {
        dispatch(setChats(data.chats));
      })
  }, [])  

  useEffect(() => {
    if (loggedInUser && loggedInUser.friends.length > 0) {
      setChosenFriend(loggedInUser.friends[0]);
    } else {
      setChosenFriend("");
    }
  }, [loggedInUser, users])

  const createChat = () => {
    fetch("http://localhost:8080/chats", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ starterId: loggedInUser._id, responderId: chosenFriend })
    })
    .then(response => response.json())
    .then(data => {
      dispatch(addChat(data.chat));
    })
  }

  const handleSelection = (event) => {
    setChosenFriend(event.target.value);
  }

  const showSelected = () => {
    console.log(chosenFriend);
  }

  return (
    <div>
    <Navbar />
    <select id="users" value={chosenFriend} onChange={handleSelection}>
    {loggedInUser && loggedInUser.friends.map(f => {
      const friendObject = users.find(u => u._id === f);
      return (
      <option key={friendObject._id} value={friendObject._id}>{friendObject.username}</option>
      )
    }
      )}  
    </select>
    <button onClick={createChat}>Create chat</button>
    <button onClick={showSelected}>show</button>
    <SideBar />
    </div>
  )
}

export default Messages;