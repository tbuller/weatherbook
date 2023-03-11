import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Comments = ({ postId }) => {

  const comments = useSelector(state => state.comments.comments);

  return (
    <div className="comments-container">
    <h1>Comments</h1>
    {comments.map(comment => {
      if (comment.postId === postId) {
        return <div key={comment._id}>{comment.comment}</div>
      }})
    } 
    </div>
  )
}

export default Comments;