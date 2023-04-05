import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../redux/commentsSlice';
import '../../styling/CommentsForm.scss';

const CommentsForm = (postId) => {

  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");

  const handleComment = (event) => {
    setComment(event.target.value);
  }

  const createComment = () => {
    fetch("http://localhost:8080/comments", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({commenterId: localStorage.getItem("userId"), postId: postId.postId, comment: comment})
    })
      .then(response => response.json())
      .then(data => dispatch(addComment(data.comment)))
  }

  const showField = () => {
    setShowForm(!showForm);
  }

  return (
    <div className="comment-form-container">
    <button className="share-thoughts-button" onClick={showField}>{showForm ? "hide comment field" : "share your thoughts"}</button>  
    {showForm && 
    <div>
    <input type="text" onChange={handleComment} />
    <button className="comment-button" onClick={createComment}>Comment</button>
    </div>}
    </div>
  )
}

export default CommentsForm;