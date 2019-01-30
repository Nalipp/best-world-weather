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
          <MapControl />
          <Map />
        </div>
      </div>
    )
  }
}

export default MapCompare;

