import React, { Component } from 'react';
import { connect } from 'react-redux';
import { activateFullScreenImages, disableFullScreenImages } from '../actions';
import './ImageList.css';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

class ImageList extends Component {
  render() {
    return (
      <div>
        {this.props.fullScreenImages 
          ?
            <div 
              onClick={this.props.disableFullScreenImages}
              className={'full-screen-images-modal'}>
              <div 
                className="full-screen-images"
                onClick={this.props.activateFullScreenImages}>
                {this.props.geoCoords.map(coords => <img alt={this.props.mapImagesLocation.cityName} key={Math.random(coords[0] * 100)} src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${coords[0]},${coords[1]}&fov=90&heading=235&pitch=10&key=${GOOGLE_API_KEY}`} />)}
              </div>
            </div>
          :
            <div style={{position: 'relative'}}>
              <div 
                className="street-images"
                onClick={this.props.activateFullScreenImages}>
                {this.props.geoCoords.map(coords => <img alt={this.props.mapImagesLocation.cityName} key={Math.random(coords[0] * 100)} src={`https://maps.googleapis.com/maps/api/streetview?size=105x105&location=${coords[0]},${coords[1]}&fov=90&heading=235&pitch=10&key=${GOOGLE_API_KEY}`} />)}
              </div>
            </div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state); 
  return {
    fullScreenImages: state.maps.fullScreenImages,
    mapImagesLocation: state.maps.mapImagesLocation,
    geoCoords: state.maps.geoCoords,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    activateFullScreenImages: () => dispatch(activateFullScreenImages()),
    disableFullScreenImages: () => dispatch(disableFullScreenImages()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageList);


