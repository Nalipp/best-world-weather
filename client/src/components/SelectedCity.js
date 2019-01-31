import React, { Component } from 'react';
import MapCompare from './MapCompare';
import CityDetail from './CityDetail';
import './SelectedCity.css';

class SelectedCity extends Component {
  render() {
    return (
      <div className={'selected-city'}>
        <CityDetail />
        <MapCompare />
      </div>
    )
  }
}

export default SelectedCity;

