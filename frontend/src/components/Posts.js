import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Posts = () => {

  const posts = useSelector(state => state.posts.posts);

  const showPosts = () => {
    console.log(posts);
  }

  return (
    <div>
    <div>
    {posts.map(post => post.posterId)}    
    </div>
    <button onClick={showPosts}>show posts button</button>
    </div>
  )
}

export default Posts;