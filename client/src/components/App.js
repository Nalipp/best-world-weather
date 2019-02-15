import React, { Component } from 'react';
import Modal from './Modal';
import Loader from './Loader';
import Heading from './Heading';
import ForcastContainer from './ForcastContainer';
import SelectedCityContainer from './SelectedCityContainer';
import { setLocationDetail } from '../actions';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
  componentDidUpdate() {
    const { filteredForcasts, setLocationDetail } = this.props;
    filteredForcasts.length > 0 && setLocationDetail(filteredForcasts[0]);
  }
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
    filteredForcasts: state.forcasts.filteredForcasts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLocationDetail: forcast => dispatch(setLocationDetail(forcast)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
