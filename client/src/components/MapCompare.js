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
            <MapContainer mapLocation={'mapLocation1'} />
          </div>
          <div className={'map-container'}>
            <MapContainer mapLocation={'mapLocation2'} />
          </div>
        </div>
        <MapControl />
      </div>
    )
  }
}

export default MapCompare;

