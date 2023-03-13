import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Comments from './Comments';
import CommentsForm from './CommentsForm';
import { GiSunRadiations } from 'react-icons/gi';
import '../styling/Posts.scss';
import usersSlice from '../redux/usersSlice';

const Posts = () => {

  const users = useSelector(state => state.users.users);  
  const posts = useSelector(state => state.posts.posts);

  const showPosts = () => {
    console.log(posts);
  }

  return (
    <div>
    <div className="posts-container">
    {posts.map(post => 
      <div key={post._id} className="post-container">
      <div>{users.map(u => u._id === post.posterId && <p key={u._id}>{u.username}</p>)}</div>
      <div>{post.city}</div>
      <div>{post.time}</div>
      <div>{post.thoughts}</div>
      {post.rain && <div>Rain: {post.rain}mm</div>}
      {post.temperature && <div>Temperature: {post.temperature}°C</div>}
      {post.precipitation && <div>Precipitation probability: {post.precipitation}%</div>}
      {post.windspeed && <div>Wind speed: {post.windspeed} km/h</div>}
      {post.radiation && <div>shortwave radiation: {post.radiation} W/m2</div>}
      {post.cloudcover && <div>cloud cover: {post.cloudcover}%</div>}
      <div>{post.createdAt}</div>
      <Comments postId={post._id} />
      <CommentsForm postId={post._id} />
      </div>
      )}    
    </div>
    <button onClick={showPosts}>show posts button</button>
    </div>
  )
}

export default Posts;