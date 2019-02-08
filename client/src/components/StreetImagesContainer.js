import React, { Component } from 'react';
import './StreetImagesContainer.css';
import { connect } from 'react-redux';
import ImageList from './ImageList';

class StreetImagesContainer extends Component {
  render() {
    const { mapImagesLocation, activeBounds } = this.props;

    return (
      <div>
        {mapImagesLocation && activeBounds
          ? 
            <div>
              <p className={"street-image-heading"}>
                {mapImagesLocation.cityName}
              </p>
              <ImageList />
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
    mapImagesLocation: state.maps.mapImagesLocation,
    activeBounds: state.maps.activeBounds,
  }
}

export default connect(mapStateToProps, null)(StreetImagesContainer);

