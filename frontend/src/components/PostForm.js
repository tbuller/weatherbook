import React from 'react';
import { useState, useEffect } from 'react';


const PostForm = () => {

  const [selectedCity, setSelectedCity] = useState();

  const getData = () => {
    console.log(selectedCity);
  }

  const handleSelectedCity = (event) => {
    setSelectedCity(event.target.value);
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${selectedCity}`)
      .then(response => response.json())
      .then(data => console.log(data))
  }


  return (
    <div>
    <h1>Your post content here</h1>
    <select id="cities" value={selectedCity} onChange={handleSelectedCity}>
      <option value="">Choose a city</option>
      <option value="Paris">Paris</option>
      <option value="London">London</option>
      <option value="New York City">New York City</option>
      <option value="Manchester">Manchester</option>
      <option value="Rome">Rome</option>
    </select>
    <button onClick={getData}>get data</button>
    </div>

  )
}

export default PostForm;