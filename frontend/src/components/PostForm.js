import React from 'react';
import { useState, useEffect, useRef } from 'react';
import WeatherInfo from './WeatherInfo';
import '../styling/PostForm.scss';


const PostForm = () => {

  const [selectedCity, setSelectedCity] = useState("London");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [time, setTime] = useState("");
  const [timeIndex, setTimeIndex] = useState(0);
  const [showConditions, setShowConditions] = useState(false);
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
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,precipitation_probability,precipitation,rain,windspeed_10m,shortwave_radiation_instant,cloudcover&forecast_days=1`)
      .then(response => response.json())
      .then(data => setWeatherData(data.hourly))
  }, [lat, long])

  const handleSelectedCity = (event) => {
    setSelectedCity(event.target.value);
  }

  const getData = () => {
    console.log(weatherData);
    console.log(weatherData.temperature_2m[5]);
    console.log(timeIndex);
    console.log(time);
  }

  const handleTime = (event) => {
    setTime(event.target.id);
    setTimeIndex(event.target.value);
    setShowConditions(!showConditions);
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
      <button id={time} key={index} value={index} className="time-button" onClick={handleTime}>{new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</button>
      )}
    <WeatherInfo 
    rain={weatherData.rain?.[timeIndex]}
    temperature={weatherData.temperature_2m?.[timeIndex]} 
    precipitation={weatherData.precipitation_probability?.[timeIndex]}
    windspeed={weatherData.windspeed_10m?.[timeIndex]}
    radiation={weatherData.shortwave_radiation_instant?.[timeIndex]}
    cloudcover={weatherData.cloudcover?.[timeIndex]}
    selectedCity={selectedCity}
    time={time}
    />
    </div>
  )
}

export default PostForm;