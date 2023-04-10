import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPokes } from '../../redux/pokesSlice';

const PokeNotification = () => {

  const dispatch = useDispatch();
  const pokes = useSelector(state => state.pokes.pokes);

  useEffect(() => {
    fetch("http://localhost:8080/pokes")
      .then(response => response.json())
      .then(data => {
        dispatch(setPokes(data.pokes));
      })
  }, [])

  return (
    <div className="poke-notification-container">

    </div>
  )
}

export default PokeNotification;