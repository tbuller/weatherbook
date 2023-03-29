import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const SideBar = () => {

  const users = useSelector(state => state.users.users)
  const chats = useSelector(state => state.chats.chats);
  const loggedInUser = useSelector(state => state.users.loggedInUser);

  const show = () => {
    console.log(chats);
    console.log(loggedInUser._id);
  }

  return (
    <div className="sidebar-container">
    {loggedInUser && chats && chats.map(c => {
      const userIsInvolved = c.starterId === loggedInUser._id || c.responderId === loggedInUser._id;
      const isStarter = c.starterId === loggedInUser._id;
      const otherUser = isStarter ? users.find(u => u._id === c.responderId) : users.find(u => u._id === c.starterId);
      return userIsInvolved &&
      <div key={c._id} className="individual-chat">
      <img alt="profile-photo" className="profile-photo" src={otherUser.photo || "/blank-photo.webp"} />
      <div>{otherUser.username}</div>
      </div>
    })}
    <button onClick={show}>show</button>
    </div>
  )
}

export default SideBar