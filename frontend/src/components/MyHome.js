import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts, addPost } from '../redux/postsSlice';
import { setComments, addComment } from '../redux/commentsSlice';
import PostForm from './PostForm';
import Posts from './Posts';

const MyHome = ({ navigate }) => {

  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const comments = useSelector(state => state.comments.comments);

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then(response => response.json())
      .then(data => dispatch(setPosts(data.posts)))
  }, [])

  useEffect(() => {
    fetch("http://localhost:8080/comments")
      .then(response => response.json())
      .then(data => dispatch(setComments(data.comments)))
  }, [])

  const showComments = () => {
    console.log(comments);
    console.log(posts);
  }

  return (
    <div>
    <h1>Welcome to your home page</h1>
    <button onClick={showComments}>Show comments</button>
    <PostForm />
    <Posts />
    </div>
  )
}

export default MyHome;