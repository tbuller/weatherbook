import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from '../../redux/usersSlice';
import { updateChat, setSelectedChat } from '../../redux/chatsSlice';
import '../../styling/Chat.scss';

const Chat = () => {

  const dispatch = useDispatch();
  const chats = useSelector(state => state.chats.chats);
  const selectedChat = useSelector(state => state.chats.selectedChat);
  const loggedInUser = useSelector(state => state.users.loggedInUser);

  const [messageContent, setMessageContent] = useState("");

  const sendMessage = () => {
    fetch("http://localhost:8080/chats", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ chatId: selectedChat._id, senderId: loggedInUser._id, messageContent: messageContent })
    })
      .then(response => response.json())
      .then(data => {
        dispatch(updateChat(data.chat));
        dispatch(setSelectedChat(data.chat));
      })
  }

  const handleMessageContent = (event) => {
    setMessageContent(event.target.value);
  }

  return (
    <div className="chats-container">
    <div className="messages-container">
    {selectedChat && selectedChat.messages && selectedChat.messages.map(m => {
      return m.senderId === loggedInUser._id ? <div className="sent-message" key={Math.random()}>{m.messageContent}</div> : <div className="received-message" key={Math.random()}>{m.messageContent}</div>
    })}  
    </div>
    <div className="chat-input-send-container">
    <input className="chat-input-field" type="text" onChange={handleMessageContent} />
    <button className="send-message-button" onClick={sendMessage}>send</button>
    </div>
    </div>
  )
}

export default Chat;