import React from 'react';
import { useState, useEffect } from 'react';


const PostForm = () => {

  const [selectedCity, setSelectedCity] = useState();
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  useEffect(() => {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${selectedCity}`) 
      .then(response => response.json())
      .then(data => {
        const city = data[0];
        setLat(parseFloat(city.lat));
        setLong(parseFloat(city.lon));
      })
  }, [selectedCity])

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,precipitation_probability,precipitation,rain,windspeed_10m&forecast_days=1`)
      .then(response => response.json())
      .then(data => console.log(data))
  }, [lat, long])

  const handleSelectedCity = (event) => {
    setSelectedCity(event.target.value);
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
    <button>get data</button>
    </div>

  )
}

export default PostForm;