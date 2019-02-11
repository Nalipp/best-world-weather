import React, { Component } from 'react';
import Modal from './Modal';
import Loader from './Loader';
import Heading from './Heading';
import ForcastContainer from './ForcastContainer';
import SelectedCityContainer from './SelectedCityContainer';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className={'app'}>
        <Modal isActive={this.props.locationDetailOn} />
        <Loader />
        <Heading />
        <div style={{display: 'flex'}}>
          <ForcastContainer />
          <SelectedCityContainer />
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

export default connect(mapStateToProps, null)(App);
