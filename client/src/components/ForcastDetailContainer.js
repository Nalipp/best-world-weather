import React, { Component } from 'react';
import { connect } from 'react-redux';
import ForcastDetail from './ForcastDetail';
import './ForcastDetailContainer.css';

class ForcastDetailContainer extends Component {
  render() {
    return (
      <div className={`forcast-detail-container`}>
        <ForcastDetail />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // state for determining display or empty container with fixed size
  }
}

export default connect(null, null)(ForcastDetailContainer);
