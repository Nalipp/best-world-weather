import React, { Component } from 'react';
import StreetImage from './StreetImage';
import './StreetImagesContainer.css';

class StreetImagesContainer extends Component {
  render() {
    return (
      <div className="street-images-container">
        <StreetImage location={'mapLocation1'} />
        <StreetImage location={'mapLocation2'} />
      </div>
    )
  }
}

export default StreetImagesContainer;

