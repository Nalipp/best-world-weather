import React, { Component } from 'react';
// import MapCompareContainer from './MapCompareContainer';
import SelectedCityNavigation from './SelectedCityNavigation';
import MapImagesContainer from './MapImagesContainer';
import ForcastDetail from './ForcastDetail';
import { connect } from 'react-redux';
import { hideLocationDetail } from '../actions';
import './SelectedCity.css';

class SelectedCity extends Component {
  render() {
    const displayStatus = this.props.locationDetailOn ? 'display-on' : 'display-off';
    return (
      <div>
        <div onClick={this.props.hideLocationDetail}
          className={`modal-background ${displayStatus}`}></div>
        <div className={`selected-city ${displayStatus}`}>
          <ForcastDetail />
          <SelectedCityNavigation />
          <MapImagesContainer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    locationDetailOn: state.forcasts.locationDetailOn, 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideLocationDetail: () => dispatch(hideLocationDetail()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCity);

