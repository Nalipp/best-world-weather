import React, { Component } from 'react';
import MapImagesMap from './MapImagesMap';
import './MapImagesContainer.css';

class MapImagesContainer extends Component {
  render() {
    return (
      <div className={"map-images-container"}>
        <MapImagesMap />
      </div>
    )
  }
}

export default MapImagesContainer;
