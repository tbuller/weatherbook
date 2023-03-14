import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Comments from './Comments';
import CommentsForm from './CommentsForm';
import { GiSunRadiations } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
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
    {posts.slice().reverse().map(post => 
      <div key={post._id} className="post-container">
      <div className="first-line-container">
      <div className="profile-picture"><CgProfile /></div>  
      <div className="username">{users.map(u => u._id === post.posterId && <p key={u._id}>{u.username}</p>)}</div>
      <div className="city">{post.city}</div>
      <div className="time">{post.time}</div>
      </div>
      <div className="thoughts">{post.thoughts}</div>
      {post.rain && <div className="rain">Rain: {post.rain}mm</div>}
      {post.temperature && <div className="temperature">Temperature: {post.temperature}°C</div>}
      {post.precipitation && <div className="precipitation">Precipitation probability: {post.precipitation}%</div>}
      {post.windspeed && <div className="windspeed">Wind speed: {post.windspeed} km/h</div>}
      {post.radiation && <div className="radiation">shortwave radiation: {post.radiation} W/m2</div>}
      {post.cloudcover && <div className="cloudcover">cloud cover: {post.cloudcover}%</div>}
      <div className="posted-at">{post.createdAt}</div>
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