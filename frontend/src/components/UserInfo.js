import React from 'react';
import { useState, useEffect } from 'react';

const UserInfo = (user) => {
  return (
    <div>{user.username}</div>
  )
}

export default UserInfo;