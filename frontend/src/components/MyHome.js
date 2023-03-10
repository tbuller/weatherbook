import React from 'react';
import { useState, useEffect } from 'react';
import PostForm from './PostForm';
import Posts from './Posts';

const MyHome = ({ navigate }) => {


  return (
    <div>
    <h1>Welcome to your home page</h1>
    <PostForm />
    <Posts />
    </div>
  )
}

export default MyHome;