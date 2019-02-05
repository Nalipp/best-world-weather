import React, { Component } from 'react';
import { GoogleApiWrapper, Map, InfoWindow } from 'google-maps-react';
import Search from './Search';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetMapLocation1, resetMapLocation2 } from '../actions';
import './MapContainer.css';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

class MapContainer extends Component {
  render() {
    const style = {
      width: '95%',
      height: '100%',
      position: 'relative',
    }
    const handleMapReset = () => {
      const { mapLocation, resetMapLocation1, resetMapLocation2 } = this.props;
      mapLocation === 'mapLocation1' ? resetMapLocation1() : resetMapLocation2();
    }
    return (
      <div>
        {
          this.props[this.props.mapLocation] 
            ? 
              <div>
                <div 
                  onClick={handleMapReset}
                  className={'change-city'}>
                  change
                </div>
                <Map  
                  className={'map'} 
                  google={this.props.google}
                  style={style}
                  zoom={this.props.mapZoomLevel}
                  draggableCursor={'default'}
                  initialCenter={{
                    lat: this.props[this.props.mapLocation].lat,
                    lng: this.props[this.props.mapLocation].lng}}
                  center={{
                    lat: this.props[this.props.mapLocation].lat,
                    lng: this.props[this.props.mapLocation].lng}}
                  disableDefaultUI={true}>
                </Map>
              </div>
            :
              <div className='search-form'>
                <Search searchType={this.props.mapLocation} />
              </div>
        }
      </div>
    );
  }
}

MapContainer.propTypes = {
  mapLocation: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    mapZoomLevel: state.maps.mapZoomLevel,
    mapLocation1: state.maps.mapLocation1,
    mapLocation2: state.maps.mapLocation2,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetMapLocation1: () => dispatch(resetMapLocation1()),
    resetMapLocation2: () => dispatch(resetMapLocation2()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: (GOOGLE_API_KEY)
})(MapContainer))
