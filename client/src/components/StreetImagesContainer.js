import React, { Component } from 'react';
import './StreetImagesContainer.css';
import { applyActiveBounds } from '../actions';
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
              <div>
                <span
                  className={"refresh-images"} 
                  onClick={this.props.applyActiveBounds}>
                  refresh images
                </span>
              </div>
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

const mapDispatchToProps = dispatch => {
  return {
    applyActiveBounds: () => dispatch(applyActiveBounds()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreetImagesContainer);

