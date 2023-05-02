import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPokes, addPoke } from '../../redux/pokesSlice';
import '../../styling/Poke.scss';

const PokeNotification = () => {

  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.users.loggedInUser);
  const selectedUser = useSelector(state => state.users.selectedUser);
  const pokes = useSelector(state => state.pokes.pokes);

  const [poked, setPoked] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/pokes")
      .then(response => response.json())
      .then(data => {
        dispatch(setPokes(data.pokes));
      })
  }, [])

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
      .then(data => {
        dispatch(addPoke(data.poke));
      })
    }
    console.log(loggedInUser._id);
    console.log(selectedUser._id);
  }, [poked])

  const handlePoke = () => {
    setPoked(true);
  }

  return (
    <div className="poke-container">
    <button className="poke-button" onClick={handlePoke}>{pokes.find(p => p.pokerId === loggedInUser._id && p.pokeeId === selectedUser._id) ? "Poked!" : "Poke"}</button>  
    </div>
  )
}

export default PokeNotification;