import React from 'react';
import { useState, useEffect, useRef } from 'react';


const PostForm = () => {

  const [selectedCity, setSelectedCity] = useState();
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [time, setTime] = useState(0);
  const [showConditions, setShowConditions] = useState(true);
  const isFirstRender = useRef(true);

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
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,precipitation_probability,precipitation,rain,windspeed_10m&forecast_days=1`)
      .then(response => response.json())
      .then(data => setWeatherData(data.hourly))
  }, [lat, long])

  const handleSelectedCity = (event) => {
    setSelectedCity(event.target.value);
  }

  const getData = () => {
    console.log(weatherData);
    console.log(weatherData.temperature_2m[5]);
    console.log(time);
  }

  const handleTime = (event) => {
    setTime(event.target.value);
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
    {weatherData.time && weatherData.time.map((time, index) => 
      <button key={index} value={index} onClick={handleTime}>{new Date(time).toLocaleTimeString()}</button>
      )}
    {showConditions &&
      <div>
      <div>{weatherData.rain && weatherData.rain[time]}</div>
      <div>{weatherData.temperature_2m && weatherData.temperature_2m[time]}</div>
      </div> 
      }  
    </div>

  )
}

export default PostForm;