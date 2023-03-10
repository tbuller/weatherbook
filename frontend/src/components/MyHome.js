import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts, addPost } from '../redux/postsSlice';
import PostForm from './PostForm';
import Posts from './Posts';

const MyHome = ({ navigate }) => {

  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then(response => response.json())
      .then(data => dispatch(setPosts(data.posts)))
  }, [])

  return (
    <div>
    <h1>Welcome to your home page</h1>
    <PostForm />
    <Posts />
    </div>
  )
}

export default MyHome;