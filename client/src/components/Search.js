import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getForcast } from '../actions';
import { getGeoCode } from '../helpers/geoCoding';
import ForcastDetail from './ForcastDetail';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }
  handleGetForcast = (e) => {
    e.preventDefault();
    const cityName = this.state.value;

    getGeoCode(cityName, (lat, lng) => {
      this.props.getForcast(cityName, lat, lng);
    });

    this.setState({ value: '' });
  }
  handleChange = (e) => {
    this.setState({value: e.target.value})
  }
  render() {
    return (
      <div className={'search'}>
        <form onSubmit={this.handleGetForcast}>
          <input 
            id="city"
            placeholder="City Search"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </form>
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

const mapDispatchToProps = dispatch => {
  return {
    getForcast: (cityName, lat, lng) => dispatch(getForcast(cityName, lat, lng)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

