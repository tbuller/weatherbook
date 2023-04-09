import React from 'react';
import { useEffect, useState } from 'react';

const PokeNotification = () => {

  const [poked, setPoked] = useState(false);

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