import React, { Component } from 'react';
import Search from './Search';
import MapCompareMap from './MapCompareMap';
import MapControl from './MapControl';
import { connect } from 'react-redux';
import './MapCompareContainer.css';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const googleUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_API_KEY}`

const EmptyMapLocationContainer = ({ searchType }) => (
  <div className={'empty-map-location-container'}>
    <p>compare city size with...</p>
    <Search searchType={searchType} />
  </div>
)

class MapCompareContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      height: 0,
      quarterHeight: 0,
    };
  }
  componentWillMount(){
    this.setState({ 
      height: window.innerHeight,
      quarterHeight: window.innerHeight / 4,
    }, () => {
      console.log(this.state);
    });
  }
  render() {
    return (
      <div className={'map-compare'}>
        <div className={'map-container'}>
          {this.props.mapLocation1 
            ?
            <MapCompareMap
              mapLocation="mapLocation1"
              googleMapURL={googleUrl}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ 
                height: `${this.state.quarterHeight}px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
            :
            <EmptyMapLocationContainer searchType={'mapLocation1'} />
          }
        </div>
        <MapControl />
        <div className={'map-container'}>
          {this.props.mapLocation2 
            ?
            <MapCompareMap
              mapLocation="mapLocation2"
              googleMapURL={googleUrl}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ 
                height: `${this.state.quarterHeight}px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
            :
            <EmptyMapLocationContainer searchType={'mapLocation2'} />
          }
        </div>
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





