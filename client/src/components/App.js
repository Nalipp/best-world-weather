import React, { Component } from 'react';
import Heading from './Heading';
import ForcastFilter from './ForcastFilter';
import ForcastList from './ForcastList';
import Footer from './Footer';
import SelectedCity from './SelectedCity';
import Loader from './Loader';
import { hideLocationDetail } from '../actions';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
  render() {
    const displayStatus = this.props.locationDetailOn ? 'display-on' : 'display-off';
    return (
      <div className={'app'}>

        <div onClick={this.props.hideLocationDetail} className={`modal-background ${displayStatus}`}></div>

        <Loader />

        <Heading />

        <div style={{display: 'flex'}}>
          <div className={`main-forcast-container`}>
            <ForcastFilter />
            <ForcastList />
          </div>
          <div className={`main-cityDetail-container ${displayStatus}`}>
            <SelectedCity />
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    locationDetailOn: state.forcasts.locationDetailOn, 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideLocationDetail: () => dispatch(hideLocationDetail()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
