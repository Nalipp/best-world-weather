import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetMapLocation1, resetMapLocation2 } from '../actions';
import './MapCompareMap.css';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"

const MapCompareMap = withScriptjs(withGoogleMap((props) => {
  const curLocation = props[props.mapLocation];

  const handleMapReset = () => {
    const { mapLocation, resetMapLocation1, resetMapLocation2 } = props;
    mapLocation === 'mapLocation1' ? resetMapLocation1() : resetMapLocation2();
  }

  return (
    <div>
      <div onClick={handleMapReset} className={'change-city'}>
        change
      </div>
      <GoogleMap
        zoom={props.mapZoomLevel}
        center={{ lat: curLocation.lat, lng: curLocation.lng }}
        options={{ disableDefaultUI: true }}
      >
      </GoogleMap>
    </div>
  )
}))

MapCompareMap.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MapCompareMap)
