import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts, addPost } from '../redux/postsSlice';

const WeatherInfo = ({ rain, temperature, precipitation, windspeed, radiation, cloudcover, selectedCity, time }) => {

  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts)

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

    const body = {
      posterId: localStorage.getItem("userId"),
      thoughts: thoughts,
      city: selectedCity,
      time: time,
    };

    if (rainIncluded) {
      body.rain = rain;
    }
    if (temperatureIncluded) {
      body.temperature = temperature;
    }
    if (precipitationIncluded) {
      body.precipitation = precipitation;
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

    fetch("http://localhost:8080/posts", {
      method: "post",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "OK") {
          dispatch(addPost(data.post));
          console.log("post added");
        } else {
          console.log(data.message);
          console.log(data.err);
        }
      })
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