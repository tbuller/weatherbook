import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChat } from '../../redux/chatsSlice';
import '../../styling/SideBar.scss';

const SideBar = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const loggedInUser = useSelector(state => state.users.loggedInUser);
  const chats = useSelector(state => state.chats.chats);
  const selectedChat = useSelector(state => state.chats.selectedChat);

  const handleChat = (chat) => {
    dispatch(setSelectedChat(chat));
  }

  const show = () => {
    console.log(chats);
    console.log(loggedInUser._id);
    console.log(selectedChat);
  }

  return (
    <div className="sidebar-container">
    {loggedInUser && chats && chats.map(c => {
      const userIsInvolved = c.starterId === loggedInUser._id || c.responderId === loggedInUser._id;
      const isStarter = c.starterId === loggedInUser._id;
      const otherUser = isStarter ? users.find(u => u._id === c.responderId) : users.find(u => u._id === c.starterId);
      return userIsInvolved &&
      <div key={c._id} className="individual-chat" onClick={() => handleChat(c)}>
      <div className="chat-profile-photo-container">  
      <img alt="chat-profile-photo" className="profile-photo" src={otherUser.photo || "/blank-photo.webp"} />
      </div>
      <div className="chat-other-user-username">{otherUser.username}</div>
      </div>
    })}
    <button onClick={show}>show</button>
    </div>
  )
}

export default SideBar