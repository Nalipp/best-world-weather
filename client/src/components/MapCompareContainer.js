import React, { Component } from 'react';
import Search from './Search';
import MapCompareMap from './MapCompareMap';
import MapControl from './MapControl';
import { connect } from 'react-redux';
import './MapCompareContainer.css';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const googleUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_API_KEY}`

class MapCompareContainer extends Component {
  render() {
    return (
      <div className={'map-compare'}>
        <div className={'map-compare_maps'}>
          <div className={'map-container'}>
            {this.props.mapLocation1 
              ?
              <MapCompareMap
                mapLocation="mapLocation1"
                googleMapURL={googleUrl}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `10em` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
              :
              <Search searchType={'mapLocation1'} />
            }
          </div>
          <div className={'map-container'}>
            {this.props.mapLocation2 
              ?
              <MapCompareMap
                mapLocation="mapLocation2"
                googleMapURL={googleUrl}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `10em` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
              :
              <Search searchType={'mapLocation2'} />
            }
          </div>
        </div>
        <MapControl />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    mapLocation1: state.maps.mapLocation1,
    mapLocation2: state.maps.mapLocation2,
  }
}

export default connect(mapStateToProps)(MapCompareContainer);





