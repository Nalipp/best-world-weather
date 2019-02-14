import React from 'react';
import { connect } from 'react-redux';
import { setBounds, resetMapImagesLocation } from '../actions';
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
          setTimeout(() => {
            this.props.setBounds(ref.getBounds()); 
          }, 1000);
        },
        onDragEnd: () => {
          console.log('drag ended...');
          setTimeout(() => {
            this.props.setBounds(refs.map.getBounds());
          }, 1000)
        },
        onZoomChanged: () => {
          console.log('zoom changed...');
          setTimeout(() => {
            this.props.setBounds(refs.map.getBounds());
          }, 1000)
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <div style={{position: 'relative'}}>
    <div 
      onClick={props.resetMapImagesLocation}
      className={'change-city'}
      style={{top: '-21.5em'}}>
      change
    </div>
    <GoogleMap
      ref={props.onMapMounted}
      zoom={12}
      center={{ lat: props.mapImagesLocation.lat, lng: props.mapImagesLocation.lng }}
      options={{ disableDefaultUI: true, zoomControl: true, }}
      onDragEnd={props.onDragEnd}
      onZoomChanged={props.onZoomChanged}
    >
    </GoogleMap>
  </div>
);

const mapStateToProps = state => {
  return {
    mapImagesLocation: state.maps.mapImagesLocation,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setBounds: newBounds => dispatch(setBounds(newBounds)),
    resetMapImagesLocation: () => dispatch(resetMapImagesLocation()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapImagesMap);
