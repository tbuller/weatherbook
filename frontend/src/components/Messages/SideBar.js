import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const SideBar = () => {

  const chats = useSelector(state => state.chats.chats);

  return (
    <div className="sidebar-container">

    </div>
  )
}