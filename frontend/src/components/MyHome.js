import React from 'react';
import { useState, useEffect } from 'react';
import PostForm from './PostForm';

const MyHome = ({ navigate }) => {


  return (
    <div>
    <h1>Welcome to your home page</h1>
    <PostForm />
    </div>
  )
}

export default MyHome;