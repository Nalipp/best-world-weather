import React, { Component } from 'react';
import MapCompare from './MapCompare';
import CityDetail from './CityDetail';
import { connect } from 'react-redux';
import { hideSingleForcast } from '../actions';
import './SelectedCity.css';

class SelectedCity extends Component {
  render() {
    const displayStatus = this.props.forcastDisplayOn ? 'display-on' : 'display-off';
    return (
      <div>
        <div 
          onClick={this.props.hideSingleForcast}
          className={`modal-background ${displayStatus}`}></div>
        <div className={`selected-city ${displayStatus}`}>
          <CityDetail />
          <MapCompare />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    forcastDisplayOn: state.forcasts.forcastDisplayOn, 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideSingleForcast: () => dispatch(hideSingleForcast()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCity);

