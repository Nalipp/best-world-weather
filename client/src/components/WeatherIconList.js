import React, { Component } from 'react';
import WeatherIcon from './WeatherIcon';

const WeatherIconList = ({ allIcons, size }) => {
  return (
    <ul style={{display: 'flex'}}>
      {allIcons.map((icon, idx) => {
        if (idx < 5) {
          return (
            <li key={idx}>
              <WeatherIcon icon={icon} size={size} />
            </li>)
        } else {
          return null;
        }
      })}
    </ul>
  )
}

export default WeatherIconList;

