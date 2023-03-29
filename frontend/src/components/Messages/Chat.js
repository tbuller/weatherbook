import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../styling/Chat.scss';

const Chat = () => {

  const chats = useSelector(state => state.chats.chats);
  const selectedChat = useSelector(state => state.chats.selectedChat);

  return (
    <div className="chats-container">
    <input className="chat-input-field" type="text" />
    </div>
  )
}

export default Chat;