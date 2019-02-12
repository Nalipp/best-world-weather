import React, { Component } from 'react';
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

export default ForcastDetailContainer;
