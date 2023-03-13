import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LikeButton from './LikeButton';

const Comments = ({ postId }) => {

  const users = useSelector(state => state.users.users);  
  const comments = useSelector(state => state.comments.comments);

  return (
    <div className="comments-container">
    <h1>Comments</h1>
    {comments.map(comment => {
      if (comment.postId === postId) {
        return ( 
        <div className="comment-container" key={comment._id}>  
        <div>{users.map(u => u._id === comment.commenterId && <p key={u._id}>{u.username}</p>)}</div>
        <div>{comment.comment}</div>
        <LikeButton commentId={comment._id} />
        <div>{comment.likes.length} likes</div>
        </div>
        )
      }})
    } 
    </div>
  )
}

export default Comments;