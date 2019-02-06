import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './StreetImage.css';

class StreetImage extends Component {
  render() {
    const curLocation = this.props[this.props.location];

    const getRandom = (num, zoomLevel) => {
      const parts = String(num).split('.');
      const pre = parts[0]
      const base = Number(parts[1]);
      const maxVariance = zoomLevel * 100000;
      const randomVariance = Math.floor(Math.random(maxVariance) * 100)
      const newBase = base + (randomVariance - (maxVariance / 2))

      if (base < 1000) {
        return pre + '.0' + String(newBase)
      } 

      return pre + '.' + String(newBase)
    }

    const getGeoCoords = (lat, lng, count) => {
      const zoomLevel = 4;
      const results = [];

      while (results.length < count) {
        results.push([getRandom(lat, zoomLevel), getRandom(lng, zoomLevel)]);
      }

      console.log('results...', results);

      return results;
    }

    const GetImage = ({ cityName, lat, lng }) => {
      const geoCoords = getGeoCoords(lat, lng, 30);
      return (
        <div className="street-image">
          {geoCoords.map(coords => <img key={coords[0] + coords[1]} src={`https://maps.googleapis.com/maps/api/streetview?size=50x50&location=${coords[0]},${coords[1]}&fov=90&heading=235&pitch=10&key=AIzaSyBvwtjPflzBTky_tl2BR8DeJBI_5HkK5zg`} />)}
        </div>
      )
    }

    return (
      <div>
        {curLocation 
          ? 
            <div>
              <GetImage 
                cityName={curLocation.cityName}
                lat={curLocation.lat}
                lng={curLocation.lng} />
            </div>
          : 
            <div></div>
        }
      </div>
    )
  }
}

StreetImage.propTypes = {
  location: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    mapLocation1: state.maps.mapLocation1,
    mapLocation2: state.maps.mapLocation2,
  }
}

export default connect(mapStateToProps, null)(StreetImage);

