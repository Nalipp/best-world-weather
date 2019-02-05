import React, { Component } from 'react';
import { Map } from 'google-maps-react';
import { InfoWindow } from 'google-maps-react';
import { GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './MapContainer.css';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

class MapContainer extends Component {
  render() {
    const style = {
      width: '95%',
      height: '100%',
      position: 'relative',
    }
    return (
      <div>
        {this.props[this.props.mapLocation] && <Map  
          className={'map'} 
          google={this.props.google}
          style={style}
          zoom={this.props.mapZoom}
          draggableCursor={'default'}
          initialCenter={{
            lat: this.props[this.props.mapLocation].lat,
            lng: this.props[this.props.mapLocation].lng}}
          center={{
            lat: this.props[this.props.mapLocation].lat,
            lng: this.props[this.props.mapLocation].lng}}
          disableDefaultUI={true}>
        </Map>}
      </div>
    );
  }
}

MapContainer.propTypes = {
  mapLocation: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    mapZoom: state.forcasts.mapZoom,
    mapLocation1: state.forcasts.mapLocation1,
    mapLocation2: state.forcasts.mapLocation2,
  }
}

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: (GOOGLE_API_KEY)
})(MapContainer))
