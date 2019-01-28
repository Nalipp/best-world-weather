import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getForcast } from '../actions';
import ForcastDetail from './ForcastDetail';

class Search extends Component {
  handleGetForcast = (lng, lat) => {
     this.props.getForcast(34.0194, -118.4108);
  }
  render() {
    return (
      <div>
        <h1 onClick={this.handleGetForcast}>search</h1>
        <ForcastDetail />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getForcast: (lng, lat) => dispatch(getForcast(lng, lat)),
  }
}

export default connect(null, mapDispatchToProps)(Search);

