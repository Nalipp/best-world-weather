import React, { Component } from 'react';
import { Map } from 'google-maps-react';
import { InfoWindow } from 'google-maps-react';
import { GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import './MapContainer.css';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace : {
        name: 'boston',
        lat: -21.805149,
        lng: -49.0921657,
      },
    }
  }
  render() {
    const style = {
      width: '95%',
      height: '100%',
      position: 'relative',
    }
    return (
      <Map  
        className={'map'} 
        google={this.props.google}
        style={style}
        zoom={4}
        draggableCursor={'default'}
        initialCenter={{
          lat: this.state.selectedPlace.lat, 
          lng: this.state.selectedPlace.lng}}
        disableDefaultUI={true}>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (GOOGLE_API_KEY)
})(MapContainer)
