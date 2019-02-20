import React, { Component } from 'react';
import { connect } from 'react-redux';
import { activateFullScreenImages, disableFullScreenImages, addGeoCoords } from '../actions';
import './ImageList.css';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const JumboImage = ({ coord1, coord2, mapImagesLocation, toggleFullScreenSingleImage }) => {
  return (
    <div onClick={toggleFullScreenSingleImage} className={'showing-jumbo-image'}>
      <img alt={mapImagesLocation.cityName} key={Math.random(coord1 * 100)} src={`https://maps.googleapis.com/maps/api/streetview?size=600x600&location=${coord1},${coord2}&fov=90&heading=235&pitch=10&key=${GOOGLE_API_KEY}`} />
    </div>
  )

        
}

class ImageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingSingleJumboImage: false,
      coord1: null,
      coord2: null,
      mapImagesLocation: null,
    }
  }
  toggleFullScreenSingleImage = (coord1, coord2, mapImagesLocation, e) => {
    this.setState({ 
      showingSingleJumboImage: !this.state.showingSingleJumboImage, 
      coord1,
      coord2,
      mapImagesLocation,
    })
  }
  render() {
    return (
      <div>
        <div>
          {this.props.fullScreenImages && <div 
            onClick={this.props.disableFullScreenImages}
            className={'full-screen-images-modal'}>
            </div>}
        </div>

        {this.state.showingSingleJumboImage && 
          <JumboImage 
            toggleFullScreenSingleImage={this.toggleFullScreenSingleImage}
            coord1={this.state.coord1}
            coord2={this.state.coord2}
            mapImagesLocation={this.state.mapImagesLocation} />}

        {this.props.geoCoords.length === 0 && 
          <div className={'no-images'}>no images available</div>}

        {this.props.fullScreenImages 
          ?
            <div className="full-screen-images">
              {this.props.geoCoords.map(coords => <img onClick={this.toggleFullScreenSingleImage.bind(this, coords[0], coords[1], this.props.mapImagesLocation)} alt={this.props.mapImagesLocation.cityName} key={Math.random(coords[0] * 100)} src={`https://maps.googleapis.com/maps/api/streetview?size=300x300&location=${coords[0]},${coords[1]}&fov=90&heading=235&pitch=10&key=${GOOGLE_API_KEY}`} />)}
              <div 
                onClick={this.props.addGeoCoords.bind(this, 15, this.props.bounds)}
                className={'more-images'}>+</div>
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
  return {
    fullScreenImages: state.maps.fullScreenImages,
    mapImagesLocation: state.maps.mapImagesLocation,
    geoCoords: state.maps.geoCoords,
    bounds: state.maps.bounds, 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    activateFullScreenImages: () => dispatch(activateFullScreenImages()),
    disableFullScreenImages: () => dispatch(disableFullScreenImages()),
    addGeoCoords: (count, bounds) => dispatch(addGeoCoords(count, bounds)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageList);


