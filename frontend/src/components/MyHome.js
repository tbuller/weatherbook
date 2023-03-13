import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../redux/usersSlice';
import { setPosts, addPost } from '../redux/postsSlice';
import { setComments, addComment } from '../redux/commentsSlice';
import Navbar from './Navbar';
import PostForm from './PostForm';
import Posts from './Posts';
import '../styling/MyHome.scss';

const MyHome = ({ navigate }) => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const posts = useSelector(state => state.posts.posts);
  const comments = useSelector(state => state.comments.comments);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => dispatch(setUsers(data.users)))
  })

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
    console.log(users);
    console.log(comments);
    console.log(posts);
  }

  return (
    <div className="myhome-page">
    <Navbar />
    <div className="myhome-container">
    <h1>Welcome to your home page</h1>
    <button onClick={showComments}>Show comments</button>
    <PostForm />
    <Posts />
    </div>
    </div>
  )
}

export default MyHome;