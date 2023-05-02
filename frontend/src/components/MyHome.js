import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers, setLoggedInUser } from '../redux/usersSlice';
import { setPosts, addPost } from '../redux/postsSlice';
import { setComments, addComment } from '../redux/commentsSlice';
import Navbar from './Navbar';
import PostForm from './Posts/PostForm';
import Posts from './Posts/Posts';
import '../styling/MyHome.scss';

const MyHome = ({ navigate }) => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const posts = useSelector(state => state.posts.posts);
  const comments = useSelector(state => state.comments.comments);

  const [showPostForm, setShowPostForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => {
        dispatch(setUsers(data.users));
        dispatch(setLoggedInUser(data.users.find(u => u._id === localStorage.getItem("userId"))));
      })
  }, [])

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

  const handleShowFormClick = () => {
    setShowPostForm(!showPostForm);
  }

  return (
    <div className="myhome-page">
    <Navbar />
    <div className="myhome-container">
    <h1 className="myhome-welcome">Home</h1>
    <button className="post-form-toggle-button" onClick={handleShowFormClick}>{showPostForm ? "Hide post form" : "Click here to create a post"}</button>
    {showPostForm && <PostForm />}
    <Posts />
    </div>
    </div>
  )
}

export default MyHome;