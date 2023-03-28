import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setLoggedInUser } from '../../redux/usersSlice';
import { setChats, addToMyChats } from '../../redux/chatsSlice';
import Navbar from '../Navbar';
import Chat from'./Chat';

const Messages = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const loggedInUser = useSelector(state => state.users.loggedInUser);
  const chats = useSelector(state => state.chats.chats);
  const myChats = useSelector(state => state.chats.myChats);

  const [chosenFriend, setChosenFriend] = useState("");
  const [isMounted, setIsMounted] = useState(false);

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

  useEffect(() => {
    chats.forEach(c => {
      if (c.starterId === localStorage.getItem("userId") || c.responderId === localStorage.getItem("userId")) {
        dispatch(addToMyChats(c));
      }
    })
  }, [chats])

  const createChat = () => {
    fetch("http://localhost:8080/chats", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ starterId: loggedInUser._id, responderId: chosenFriend })
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  const handleSelection = (event) => {
    setChosenFriend(event.target.value);
  }

  const showSelected = () => {
    console.log(chosenFriend);
    console.log(myChats);
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
    </div>
  )
}

export default Messages;