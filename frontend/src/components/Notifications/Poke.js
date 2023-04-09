import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from '../../redux/usersSlice';

const PokeNotification = () => {

  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.users.loggedInUser);
  const selectedUser = useSelector(state => state.users.selectedUser);


  const [poked, setPoked] = useState(false);

  // useEffect(() => {
  //   fetch("http://localhost:8080/users")
  //     .then(response => response.json())
  //     .then(data => {
  //       dispatch(setLoggedInUser(data.users.find(u => u._id === localStorage.getItem("userId"))));
  //     })
  // }, [])

  useEffect(() => {
    if (poked) {
      fetch("http://localhost:8080/pokes", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ pokerId: loggedInUser._id, pokeeId: selectedUser._id })
    })
      .then(response => response.json())
      .then(data => console.log(data))
    }
    console.log(loggedInUser._id);
    console.log(selectedUser._id);
  }, [poked])

  const handlePoke = () => {
    setPoked(true);
  }

  return (
    <div>
    <button onClick={handlePoke}>Poke</button>  
    </div>
  )
}

export default PokeNotification;