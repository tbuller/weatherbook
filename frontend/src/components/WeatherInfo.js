import React from 'react';
import { useState, useEffect } from 'react';

const WeatherInfo = ({ rain, temperature, precipitation, windspeed, radiation, cloudcover }) => {

  const [rainIncluded, setRainIncluded] = useState(false);
  const [temperatureIncluded, setTemperatureIncluded] = useState(false);
  const [precipitationIncluded, setPrecipitationIncluded] = useState(false);
  const [windspeedIncluded, setWindspeedIncluded] = useState(false);
  const [radiationIncluded, setRadiationIncluded] = useState(false);
  const [cloudcoverIncluded, setCloudcoverIncluded] = useState(false);
  const [thoughts, setThoughts] = useState("");

  const handleThoughts = (event) => {
    setThoughts(event.target.value);
  }

  const createPost = () => {
    const body = {thoughts: thoughts};

    if (rainIncluded) {
      body.rain = rain;
    }
    if (temperatureIncluded) {
      body.temperature = temperature;
    }
    if (precipitationIncluded) {
      body.precipitaion = precipitation;
    }
    if (windspeedIncluded) {
      body.windspeed = windspeed;
    }
    if (radiationIncluded) {
      body.radiation = radiation;
    } 
    if (cloudcoverIncluded) {
      body.cloudcover = cloudcover;
    }

    fetch("http://localhost:8080/users", {
      method: "post",
      headers: {
        "Content-Type" : "application/json"
      },
      body: body
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  return (
    <div>
    <div>
    <label>Share your thoughts:</label>  
    <input type="text" onChange={handleThoughts} />
    </div>
    <span>
    <div>Rain: {rain}mm</div>
    <button onClick={() => setRainIncluded(!rainIncluded)}>Add to post</button>
    </span>
    <span>
    <div>Temperature: {temperature}°C</div>
    <button onClick={() => setTemperatureIncluded(!temperatureIncluded)}>Add to post</button>
    </span>
    <span>
    <div>Precipitation probability: {precipitation}%</div>
    <button onClick={() => setPrecipitationIncluded(!precipitationIncluded)}>Add to post</button>
    </span>
    <span>
    <div>Windspeed: {windspeed} km/h</div>
    <button onClick={() => setWindspeedIncluded(!windspeedIncluded)}>Add to post</button>
    </span>
    <span>
    <div>Radiation: {radiation} W/m2</div>
    <button onClick={() => setRadiationIncluded(!radiationIncluded)}>Add to post</button>
    </span>
    <span>
    <div>Cloudcover: {cloudcover}%</div>
    <button onClick={() => setCloudcoverIncluded(!cloudcoverIncluded)}>Add to post</button>
    </span>
    <button onClick={createPost}>Create post!</button>
    </div>
  )
}

export default WeatherInfo;