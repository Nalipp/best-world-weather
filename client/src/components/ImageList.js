import React, { Component } from 'react';
import { connect } from 'react-redux';
import { applyActiveBounds } from '../actions';
import './ImageList.css';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

class ImageList extends Component {
  render() {
    return (
      <div className="street-image">
        <div className={"refresh-images"} 
          onClick={this.props.applyActiveBounds}>
          refresh
        </div>
        {this.props.geoCoords.map(coords => <img alt={this.props.mapImagesLocation.cityName} key={Math.random(coords[0] * 100)} src={`https://maps.googleapis.com/maps/api/streetview?size=105x105&location=${coords[0]},${coords[1]}&fov=90&heading=235&pitch=10&key=${GOOGLE_API_KEY}`} />)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    mapImagesLocation: state.maps.mapImagesLocation,
    geoCoords: state.maps.geoCoords,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    applyActiveBounds: () => dispatch(applyActiveBounds()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageList);


