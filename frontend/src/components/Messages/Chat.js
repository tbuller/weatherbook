import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Chat = () => {

  const chats = useSelector(state => state.chats.chats);

  return (
    <div className="chats-container">

    </div>
  )
}

export default Chat;