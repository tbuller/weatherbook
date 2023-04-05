import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment } from '../../redux/commentsSlice';
import { AiOutlineLike } from 'react-icons/ai';
import '../../styling/LikeButton.scss';

const LikeButton = ({ commentId }) => {

  const dispatch = useDispatch();

  const comments = useSelector(state => state.comments.comments);
  const loggedInUser = useSelector(state => state.users.loggedInUser);

  const likeComment = () => {
    fetch("http://localhost:8080/comments", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ commentId: commentId, likerId: loggedInUser._id })
    })
      .then(response => response.json())
      .then(data => {
        dispatch(updateComment(data.comment));
      })
  }

  return (
    <div>
    <button className="like-button" onClick={likeComment}><AiOutlineLike /></button>  
    </div>
  )
}

export default LikeButton;