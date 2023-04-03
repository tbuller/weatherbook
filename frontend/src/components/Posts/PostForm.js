import React from 'react';
import { useState, useEffect, useRef } from 'react';
import WeatherInfo from './WeatherInfo';
import '../../styling/PostForm.scss';


const PostForm = () => {

  const [selectedCity, setSelectedCity] = useState("London");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(23);
  const [hoursToDisplay, setHoursToDisplay] = useState([]);
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
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,precipitation_probability,precipitation,rain,windspeed_10m,shortwave_radiation_instant,cloudcover&forecast_days=7`)
      .then(response => response.json())
      .then(data => setWeatherData(data.hourly))
  }, [lat, long])

  useEffect(() => {
    setStartIndex(selectedDay * 24);
    setEndIndex((selectedDay * 24) + 24);
    setTimeIndex(0 + (selectedDay * 24))
  }, [selectedDay])

  useEffect(() => {
    setHoursToDisplay(weatherData.time?.slice(startIndex, endIndex));
  }, [startIndex, endIndex])

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
    setTimeIndex(parseInt(event.target.value) + startIndex);
    setShowConditions(!showConditions);
  }

  const generateDayLabels = () => {
    const labels = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(day.getDate() + i);
      const dayLabel = i === 0 ? "Today" : day.toLocaleDateString("en-US", { weekday: "long" });
      labels.push(dayLabel);
    }

    return labels;
  }

  const dayButtons = generateDayLabels().map((l, i) => (
    <button key={i} onClick={() => setSelectedDay(i)}>{l}</button>
  ))

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
    <div>{dayButtons}</div>
    <button onClick={getData}>get data</button>
    {hoursToDisplay && hoursToDisplay?.map((time, index) => 
      <button id={time} key={index} value={index} className={`time-button ${timeIndex === (index + (selectedDay * 24)) ? 'selected' : ''}`} onClick={handleTime}>{new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</button>
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