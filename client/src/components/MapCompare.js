import React, { Component } from 'react';
import MapContainer from './MapContainer';
import MapControl from './MapControl';
import './MapCompare.css';

class MapCompare extends Component {
  render() {
    return (
      <div className={'map-compare'}>
        <div className={'map-compare_maps'}>
          <div className={'map-container'}>
            <MapContainer />
          </div>
          <div className={'map-container'}>
            <MapContainer />
          </div>
        </div>
        <MapControl />
      </div>
    )
  }
}

export default MapCompare;

