import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from '../../redux/usersSlice';

const PokeNotification = () => {

  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.users.loggedInUser)

  const [poked, setPoked] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => {
        dispatch(setLoggedInUser(data.users.find(u => u._id === localStorage.getItem("userId"))));
      })
  }, [])

  useEffect(() => {
    fetch("http://localhost:8080/pokes", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ pokerId: loggedInUser._id, pokeeId: pokeeId })
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }, [poked])

  const handlePoke = () => {
    setPoked(true);
  }

  return (
    <div>
    <button>Poke</button>  
    </div>
  )
}

export default PokeNotification;