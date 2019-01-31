import React, { Component } from 'react';
import MapCompare from './MapCompare';
import './CityDetail.css';

class CityDetail extends Component {
  render() {
    return (
      <div className={'city-detail'}>
        <MapCompare />
      </div>
    )
  }
}

export default CityDetail;

