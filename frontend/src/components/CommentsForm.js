import React from 'react';
import { useState, useEffect } from 'react';

const CommentsForm = (postId) => {

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
      .then(data => console.log(data))
  }

  return (
    <div className="comment-container">
    <input type="text" onChange={handleComment} />
    <button onClick={createComment}>Add comment</button>
    </div>
  )
}

export default CommentsForm;