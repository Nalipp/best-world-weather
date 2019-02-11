import React, { Component } from 'react';
import ForcastFilter from './ForcastFilter';
import ForcastList from './ForcastList';
import './ForcastContainer.css';

class ForcastContainer extends Component {
  render() {
    return (
      <div className={`forcast-container`}>
        <ForcastFilter />
        <ForcastList />
      </div>
    )
  }
}

export default ForcastContainer;
