import React, { Component } from 'react';
import MapImagesMap from './MapImagesMap';
import StreetImagesContainer from './StreetImagesContainer';
import Search from './Search';
import { connect } from 'react-redux';
import './MapImagesContainer.css';

class MapImagesContainer extends Component {
  render() {
    return (
      <div className={"map-images-container"}>
        {this.props.mapImagesLocation 
          ? 
            <div>
              <MapImagesMap /> 
              <StreetImagesContainer />
            </div>
          : 
            <Search searchType={'mapImagesLocation'}/>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    mapImagesLocation: state.maps.mapImagesLocation,
  }
}

export default connect(mapStateToProps)(MapImagesContainer);
