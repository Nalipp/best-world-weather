import React, { Component } from 'react';
import SelectedCityNavigation from './SelectedCityNavigation';
import ForcastDetailContainer from './ForcastDetailContainer';
import MapCompareContainer from './MapCompareContainer';
import MapImagesContainer from './MapImagesContainer';
import { connect } from 'react-redux';
import { hideLocationDetail } from '../actions';
import './SelectedCity.css';

class SelectedCity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'data',
    }
  }
  handleSelect = (e) => {
    this.setState({ selected: e.target.id })
  }
  render() {
    const displayStatus = this.props.locationDetailOn ? 'display-on' : 'display-off';
    return (
      <div>
        <div onClick={this.props.hideLocationDetail}
          className={`modal-background ${displayStatus}`}></div>
        <div className={`selected-city ${displayStatus}`}>
          <SelectedCityNavigation 
            handleSelect={this.handleSelect}
            selected={this.state.selected} />
          {this.state.selected === 'data' && <ForcastDetailContainer />}
          {this.state.selected === 'maps' && <MapCompareContainer />}
          {this.state.selected === 'images' && <MapImagesContainer />}
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

const mapDispatchToProps = dispatch => {
  return {
    hideLocationDetail: () => dispatch(hideLocationDetail()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCity);

