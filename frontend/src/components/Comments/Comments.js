import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LikeButton from './LikeButton';
import '../../styling/Comments.scss';

const Comments = ({ postId }) => {

  const users = useSelector(state => state.users.users);  
  const comments = useSelector(state => state.comments.comments);

  return (
    <div className="comments-container">
    <h3>Comments</h3>
    {comments.map(comment => {
      if (comment?.postId === postId) {
        const commenter = users.find(u => u._id === comment.commenterId);
        return ( 
        <div className="comment-container" key={comment._id}> 
        <div className="photo-username-container">
        <img className="profile-photo commenter-photo" alt="profile-photo" src={commenter.photo || "/blank-photo.webp"} />
        <div className="commenter-username" key={commenter._id}>{commenter.username}</div>
        </div>
        <div className="comment-content">{comment.comment}</div>
        <div className="like-counter-container">
        <LikeButton commentId={comment._id} />
        <div className="likes-count">{comment.likes.length} {comment.likes.length === 1 ? "like" : "likes"}</div>
        </div>
        </div>
        )
      }})
    } 
    </div>
  )
}

export default Comments;