import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increaseMapZoom, decreaseMapZoom } from '../actions';
import './MapControl.css';

class MapControl extends Component {
  render() {
    return (
      <div className={'map-control'}>
        <button onClick={this.props.decreaseMapZoom} type="button">-</button>
        <span>{this.props.mapZoomLevel}</span>
        <button onClick={this.props.increaseMapZoom} type="button">+</button>
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
