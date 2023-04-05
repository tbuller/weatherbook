import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment } from '../../redux/commentsSlice';
import { AiOutlineLike } from 'react-icons/ai';
import '../../styling/LikeButton.scss';

const LikeButton = ({ commentId }) => {

  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments.comments);
  const loggedInUser = useSelector(state => state.users.loggedInUser);

  useEffect(() => {
    const relevantComment = comments.find(c => c._id === commentId);

    if (loggedInUser && relevantComment && relevantComment.likes.includes(loggedInUser._id)) {
      setIsLiked(true);
    }
  }, [loggedInUser, comments, commentId])

  const handleLikeButton = () => {
    if (!isLiked) {
      likeComment();
    } else {
      unlikeComment();
    }
  }

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

  const unlikeComment = () => {
    fetch("http://localhost:8080/comments/unlike", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ commentId: commentId, likerId: loggedInUser._id })
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  return (
    <div>
    <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={likeComment}><AiOutlineLike /></button>  
    </div>
  )
}

export default LikeButton;