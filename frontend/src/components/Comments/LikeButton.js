import React from 'react';
import { useState, useEffect } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import '../../styling/LikeButton.scss';

const LikeButton = ({ commentId }) => {

  const likeComment = () => {
    fetch("http://localhost:8080/comments", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ commentId: commentId, likerId: localStorage.getItem("userId") })
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  return (
    <div>
    <button className="like-button" onClick={likeComment}><AiOutlineLike /></button>  
    </div>
  )
}

export default LikeButton;