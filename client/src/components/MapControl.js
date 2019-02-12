import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increaseMapZoom, decreaseMapZoom } from '../actions';
import './MapControl.css';

class MapControl extends Component {
  render() {
    return (
      <div className={'map-control'}>
        <div onClick={this.props.decreaseMapZoom}>-</div>
        <span>{this.props.mapZoomLevel}</span>
        <div onClick={this.props.increaseMapZoom}>+</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    mapZoomLevel: state.maps.mapZoomLevel,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increaseMapZoom: () => dispatch(increaseMapZoom()),
    decreaseMapZoom: () => dispatch(decreaseMapZoom()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapControl);
