import React, { Component } from 'react';
import './MapControl.css';

class MapControl extends Component {
  render() {
    return (
      <div className={'map-control'}>
        <button type="button">+</button>
        <button type="button">-</button>
      </div>
    )
  }
}

export default MapControl;
