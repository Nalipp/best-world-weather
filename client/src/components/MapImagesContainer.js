import React, { Component } from 'react';
import MapImagesMap from './MapImagesMap';
import StreetImagesContainer from './StreetImagesContainer';
import './MapImagesContainer.css';

class MapImagesContainer extends Component {
  render() {
    return (
      <div className={"map-images-container"}>
        <MapImagesMap />
        <StreetImagesContainer />
      </div>
    )
  }
}

export default MapImagesContainer;
