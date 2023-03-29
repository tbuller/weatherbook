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

  const show = () => {
    console.log(messageContent);
    console.log(chats);
  }

  return (
    <div className="chats-container">
    <div className="messages-container">
    {selectedChat && selectedChat.messages && selectedChat.messages.map(m => {
      return m.senderId === loggedInUser._id ? <div className="sent-message">{m.messageContent}</div> : <div className="received-message">{m.messageContent}</div>
    })}  
    </div>
    <input className="chat-input-field" type="text" onChange={handleMessageContent} />
    <button onClick={sendMessage}>send</button>
    <button onClick={show}>show</button>
    </div>
  )
}

export default Chat;