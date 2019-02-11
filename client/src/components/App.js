import React, { Component } from 'react';
import Modal from './Modal';
import Loader from './Loader';
import Heading from './Heading';
import ForcastFilter from './ForcastFilter';
import ForcastList from './ForcastList';
import SelectedCityContainer from './SelectedCityContainer';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
  render() {
    const displayStatus = this.props.locationDetailOn ? 'display-on' : 'display-off';
    return (
      <div className={'app'}>
        <Modal displayState={displayStatus} />
        <Loader />
        <Heading />

        <div style={{display: 'flex'}}>
          <div className={`main-forcast-container`}>
            <ForcastFilter />
            <ForcastList />
          </div>
          <div className={`main-cityDetail-container ${displayStatus}`}>
            <SelectedCityContainer />
          </div>
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
