import React from 'react';
import { useState, useEffect, useRef } from 'react';
import WeatherInfo from './WeatherInfo';


const PostForm = () => {

  const [selectedCity, setSelectedCity] = useState();
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [time, setTime] = useState(0);
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
    console.log(time);
  }

  const handleTime = (event) => {
    setTime(event.target.value);
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
      <button key={index} value={index} onClick={handleTime}>{new Date(time).toLocaleTimeString()}</button>
      )}
    {/* <div className="data-container">
    <div>Rain: {weatherData.rain && weatherData.rain[time]}mm</div>
    <div>Temperature: {weatherData.temperature_2m && weatherData.temperature_2m[time]}°C</div>
    <div>Precipitation probability: {weatherData.precipitation_probability && weatherData.precipitation_probability[time]}%</div>
    <div>windspeed: {weatherData.windspeed_10m && weatherData.windspeed_10m[time]}</div>
    </div>  */}
    <WeatherInfo 
    rain={weatherData.rain?.[time]}
    temperature={weatherData.temperature_2m?.[time]} 
    precipitation={weatherData.precipitation_probability?.[time]}
    windspeed={weatherData.windspeed_10m?.[time]}
    radiation={weatherData.shortwave_radiation_instant?.[time]}
    cloudover={weatherData.cloudover?.[time]}
    />
    </div>
  )
}

export default PostForm;