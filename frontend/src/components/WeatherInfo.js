import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts, addPost } from '../redux/postsSlice';
import { GiSunRadiations, GiWindsock } from 'react-icons/gi';
import { FaWind, FaTemperatureHigh, FaThermometerHalf } from 'react-icons/fa';
import { SiRainmeter } from 'react-icons/si'
import { BsCloudRainFill, BsCloudsFill } from 'react-icons/bs';
import { RiAddCircleLine } from 'react-icons/ri';
import '../styling/WeatherInfo.scss';

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
    <div className="post-form-container">
    <div>
    <label>Share your thoughts:</label>  
    <input type="text" onChange={handleThoughts} />
    </div>
    <div className="info-container">
    <span className="weather-metric">
    <div><SiRainmeter className="rain-icon" />Rain: {rain}mm</div>
    <button onClick={() => setRainIncluded(!rainIncluded)}><RiAddCircleLine className="add-info-button" /></button>
    </span>
    <span className="weather-metric">
    <div><FaThermometerHalf className="temperature-icon" />Temperature: {temperature}°C</div>
    <button onClick={() => setTemperatureIncluded(!temperatureIncluded)}><RiAddCircleLine className="add-info-button" /></button>
    </span>
    <span className="weather-metric">
    <div><BsCloudRainFill className="precipitation-icon" />Precipitation probability: {precipitation}%</div>
    <button onClick={() => setPrecipitationIncluded(!precipitationIncluded)}><RiAddCircleLine className="add-info-button" /></button>
    </span>
    <span className="weather-metric">
    <div><FaWind className="wind-icon" />Windspeed: {windspeed} km/h</div>
    <button onClick={() => setWindspeedIncluded(!windspeedIncluded)}><RiAddCircleLine className="add-info-button" /></button>
    </span>
    <span className="weather-metric">
    <div><GiSunRadiations className="radiation-icon" />Radiation: {radiation} W/m2</div>
    <button onClick={() => setRadiationIncluded(!radiationIncluded)}><RiAddCircleLine className="add-info-button" /></button>
    </span>
    <span className="weather-metric">
    <div><BsCloudsFill className="cloudcover-icon" />Cloudcover: {cloudcover}%</div>
    <button onClick={() => setCloudcoverIncluded(!cloudcoverIncluded)}><RiAddCircleLine className="add-info-button" /></button>
    </span>
    <button onClick={createPost}>Create post!</button>
    </div>
    </div>
  )
}

export default WeatherInfo;