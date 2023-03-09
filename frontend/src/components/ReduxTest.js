import React from 'react';
import { useSelector } from 'react-redux';

const ReduxTest = () => {

  const users = useSelector(state => state.users.users);

  return (
    <div>
    {users && users.map(u => <div>{u.email}</div>)}
    </div>
  )
}

export default ReduxTest;