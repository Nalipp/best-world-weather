import React, { Component } from 'react';
import { connect } from 'react-redux';
const { compose, withProps, lifecycle } = require("recompose");
const { withScriptjs, withGoogleMap, GoogleMap } = require("react-google-maps");
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const googleUrl = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`

const MapImagesMap = compose(
  withProps({
    googleMapURL: googleUrl,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `200px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          console.log(refs.map.getBounds())
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    zoom={12}
    center={{ lat: props.mapLocation1.lat, lng: props.mapLocation1.lng }}
    options={{ disableDefaultUI: true, zoomControl: true, }}
    onBoundsChanged={props.onBoundsChanged}
  >
  </GoogleMap>
);

const mapStateToProps = state => {
  console.log(state.maps.mapLocation1);
  return {
    mapLocation1: state.maps.mapLocation1,
  }
}

export default connect(mapStateToProps, null)(MapImagesMap);
