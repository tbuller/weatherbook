import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Comments from '../Comments/Comments';
import CommentsForm from '../Comments/CommentsForm';
import { GiSunRadiations } from 'react-icons/gi';
import { FaWind, FaThermometerHalf } from 'react-icons/fa';
import { SiRainmeter } from 'react-icons/si'
import { BsCloudRainFill, BsCloudsFill } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import '../../styling/Posts.scss';
import usersSlice from '../../redux/usersSlice';

const Posts = () => {

  const users = useSelector(state => state.users.users); 
  const loggedInUser = useSelector(state => state.users.loggedInUser); 
  const posts = useSelector(state => state.posts.posts);

  const showPosts = () => {
    console.log(posts);
  }

  const formatDate = (postTime) => {
    const postDate = new Date(postTime);
    const today = new Date();

    if (postDate.toDateString() === today.toDateString()) {
      return `Today, ${postDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  
    return `${postDate.getDate().toString().padStart(2, '0')}/${(postDate.getMonth() + 1).toString().padStart(2, '0')}, ${postDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  return (
    <div className="posts-container-conatainer">
    <div className="posts-container">
    {users && loggedInUser && posts && posts.slice().reverse().map(post => 
      (users.find(u => u._id === post.posterId).friends.includes(loggedInUser._id) || post.posterId === loggedInUser._id) &&
      <div key={post._id} className="post-container">
      <div className="first-line-container">
      <img className="profile-photo" alt="profile-photo" src={users.find(u => u._id === post.posterId)?.photo || "/blank-photo.webp"} />  
      <div className="username">{users.map(u => u._id === post.posterId && <p key={u._id}>{u.username}</p>)}</div>
      <div className="city"><CiLocationOn className="location-icon" />{post.city}</div>
      <div className="time">{formatDate(post.time)}</div>
      </div>
      <div className="thoughts">{post.thoughts}</div>
      {post.rain !== null && <div className="rain"><SiRainmeter className="rain-icon-post" />Rain: {post.rain}mm</div>}
      {post.temperature && <div className="temperature"><FaThermometerHalf className="temperature-icon-post" />Temperature: {post.temperature}°C</div>}
      {post.precipitation && <div className="precipitation"><BsCloudRainFill className="precipitation-icon-post" />Precipitation probability: {post.precipitation}%</div>}
      {post.windspeed && <div className="windspeed"><FaWind className="wind-icon-post" />Wind speed: {post.windspeed} km/h</div>}
      {post.radiation && <div className="radiation"><GiSunRadiations className="radiation-icon-post" />shortwave radiation: {post.radiation} W/m2</div>}
      {post.cloudcover && <div className="cloudcover"><BsCloudsFill className="cloud-icon-post" />cloud cover: {post.cloudcover}%</div>}
      <div className="posted-at">Posted at: {`${new Date(post.postedAt).toLocaleDateString()} ${new Date(post.postedAt).toLocaleTimeString()}`}</div>
      <Comments postId={post._id} />
      <CommentsForm postId={post._id} />
      </div>
      )}    
    </div>
    </div>
  )
}

export default Posts;