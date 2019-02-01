import React, { Component } from 'react';
import MapCompare from './MapCompare';
import { connect } from 'react-redux';
import ForcastDetail from './ForcastDetail';
import './CityDetail.css';

class CityDetail extends Component {
  render() {
    return (
      <div className={'city-detail'}>
        {this.props.forcastDisplayOn && <ForcastDetail />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    forcastDisplayOn: state.forcasts.forcastDisplayOn,
  }
}

export default connect(mapStateToProps, null)(CityDetail);

