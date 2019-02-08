import React, { Component } from 'react';
import './StreetImagesContainer.css';
import { connect } from 'react-redux';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

class StreetImagesContainer extends Component {
  render() {
    const curLocation = this.props.mapImagesLocation || this.props.mapLocation1;

    const getGeoCoords = (count) => {
      return [[40.6235, -73.9287], [40.6135, -73.9187], [40.6635, -73.9387], [40.6735, -73.9287], [40.6635, -73.9187], [40.6335, -73.9387]]
    }

    const GetImages = ({ cityName }) => {
      const geoCoords = getGeoCoords(40);
      return (
        <div className="street-image">
          {geoCoords.map(coords => <img alt={cityName} key={Math.random(coords[0] * 100)} src={`https://maps.googleapis.com/maps/api/streetview?size=105x105&location=${coords[0]},${coords[1]}&fov=90&heading=235&pitch=10&key=${GOOGLE_API_KEY}`} />)}
        </div>
      )
    }

    return (
      <div>
        {curLocation 
          ? 
            <div>
              <p className={"street-image-heading"}>{curLocation.cityName}</p>
              <GetImages cityName={curLocation.cityName} />
            </div>
          : 
            <div></div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    mapLocation1: state.maps.mapLocation1,
    mapImagesLocation: state.maps.mapImagesLocation,
    bounds: state.maps.bounds,
  }
}

export default connect(mapStateToProps, null)(StreetImagesContainer);

