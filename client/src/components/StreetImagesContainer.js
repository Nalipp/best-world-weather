import React, { Component } from 'react';
import './StreetImagesContainer.css';
import { connect } from 'react-redux';
import ImageList from './ImageList';

class StreetImagesContainer extends Component {
  render() {
    const { mapImagesLocation } = this.props;

    return (
      <div>
        {mapImagesLocation
          ? 
            <div>
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
  }
}

export default connect(mapStateToProps)(StreetImagesContainer);

