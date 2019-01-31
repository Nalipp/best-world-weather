import React, { Component } from 'react';
import Map from './Map';
import MapControl from './MapControl';
import './MapCompare.css';

class MapCompare extends Component {
  render() {
    return (
      <div className={'map-compare'}>
        <div>
          <Map />
          <Map />
        </div>
        <MapControl />
      </div>
    )
  }
}

export default MapCompare;

