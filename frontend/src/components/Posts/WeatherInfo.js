import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts, addPost } from '../../redux/postsSlice';
import { GiSunRadiations, GiWindsock } from 'react-icons/gi';
import { FaWind, FaTemperatureHigh, FaThermometerHalf } from 'react-icons/fa';
import { SiRainmeter } from 'react-icons/si'
import { BsCloudRainFill, BsCloudsFill } from 'react-icons/bs';
import { RiAddCircleLine } from 'react-icons/ri';
import '../../styling/WeatherInfo.scss';

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
    <div className="post-form-info-container">
    <div className="post-form-info-wrapper">
    <label className="share-thoughts-label">Share your thoughts:</label>  
    <input className="share-thoughts-input" type="text" onChange={handleThoughts} />
    </div>
    <div className="info-container">
    <span className="weather-metric">
    <div className="metric-div"><SiRainmeter className="rain-icon" /><p className="metric-data">Rain: {rain}mm</p></div>
    <button className="add-info-button" onClick={() => setRainIncluded(!rainIncluded)}><RiAddCircleLine className={rainIncluded ? "add-info-icon-selected" : "add-info-icon"} /></button>
    </span>
    <span className="weather-metric">
    <div className="metric-div"><FaThermometerHalf className="temperature-icon" /><p className="metric-data">Temperature: {temperature}°C</p></div>
    <button className="add-info-button" onClick={() => setTemperatureIncluded(!temperatureIncluded)}><RiAddCircleLine className={temperatureIncluded ? "add-info-icon-selected" : "add-info-icon"} /></button>
    </span>
    <span className="weather-metric">
    <div className="metric-div"><BsCloudRainFill className="precipitation-icon" /><p className="metric-data">Precipitation probability: {precipitation}%</p></div>
    <button className="add-info-button" onClick={() => setPrecipitationIncluded(!precipitationIncluded)}><RiAddCircleLine className={precipitationIncluded ? "add-info-icon-selected" : "add-info-icon"} /></button>
    </span>
    <span className="weather-metric">
    <div className="metric-div"><FaWind className="wind-icon" /><p className="metric-data">Windspeed: {windspeed} km/h</p></div>
    <button className="add-info-button" onClick={() => setWindspeedIncluded(!windspeedIncluded)}><RiAddCircleLine className={windspeedIncluded ? "add-info-icon-selected" : "add-info-icon"} /></button>
    </span>
    <span className="weather-metric">
    <div className="metric-div"><GiSunRadiations className="radiation-icon" /><p className="metric-data">Radiation: {radiation} W/m2</p></div>
    <button className="add-info-button" onClick={() => setRadiationIncluded(!radiationIncluded)}><RiAddCircleLine className={radiationIncluded ? "add-info-icon-selected" : "add-info-icon"} /></button>
    </span>
    <span className="weather-metric">
    <div className="metric-div"><BsCloudsFill className="cloudcover-icon" /><p className="metric-data">Cloudcover: {cloudcover}%</p></div>
    <button className="add-info-button" onClick={() => setCloudcoverIncluded(!cloudcoverIncluded)}><RiAddCircleLine className={cloudcoverIncluded ? "add-info-icon-selected" : "add-info-icon"} /></button>
    </span>
    <button className="submit-post-button" onClick={createPost}>Post!</button>
    </div>
    </div>
  )
}

export default WeatherInfo;