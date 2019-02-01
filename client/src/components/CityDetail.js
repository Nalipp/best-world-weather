import React, { Component } from 'react';
import MapCompare from './MapCompare';
import { connect } from 'react-redux';
import ForcastDetail from './ForcastDetail';
import './CityDetail.css';

class CityDetail extends Component {
  render() {
    return (
      <div className={'city-detail'}>
        {this.props.forcastDisplay && <ForcastDetail />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    forcastDisplay: state.forcasts.forcastDisplay,
  }
}

export default connect(mapStateToProps, null)(CityDetail);

