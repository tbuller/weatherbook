import React from 'react';
import { useState, useEffect } from 'react';

const WeatherInfo = ({ rain, temperature, precipitation, windspeed, radiation, cloudcover }) => {

  return (
    <div>
    <div>Rain: {rain}mm</div>
    <div>Temperature: {temperature}°C</div>
    <div>Precipitation probability: {precipitation}%</div>
    <div>Windspeed: {windspeed} km/h</div>
    <div>Radiation: {radiation} W/m2</div>
    <div>Cloudcover: {cloudcover}%</div>
    </div>
  )
}

export default WeatherInfo;