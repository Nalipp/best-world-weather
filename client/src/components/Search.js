import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getForcast, setMapLocation1, setMapLocation2, setMapImagesLocation } from '../actions';
import { getGeoCode } from '../helpers/geoCoding';
import PropTypes from 'prop-types';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }
  handleSearch = (e) => {
    e.preventDefault();
    const cityName = this.state.value;
    const searchType = this.props.searchType;

    getGeoCode(cityName, (lat, lng) => {
      if (searchType === 'getForcast') this.props.getForcast(cityName, lat, lng);
      if (searchType === 'mapLocation1') this.props.setMapLocation1(cityName, lat, lng);
      if (searchType === 'mapLocation2') this.props.setMapLocation2(cityName, lat, lng);
      if (searchType === 'mapImagesLocation') this.props.setMapImagesLocation(cityName, lat, lng);
    });

    this.setState({ value: '' });
  }
  handleChange = (e) => {
    this.setState({value: e.target.value})
  }
  render() {
    return (
      <div className={'search'}>
        <form onSubmit={this.handleSearch}>
          <input 
            id="city"
            placeholder="Search"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </form>
      </div>
    )
  }
}

Search.propTypes = {
  searchType: PropTypes.string,
}

const mapDispatchToProps = dispatch => {
  return {
    getForcast: (cityName, lat, lng) => dispatch(getForcast(cityName, lat, lng)),
    setMapLocation1: (cityName, lat, lng) => dispatch(setMapLocation1(cityName, lat, lng)),
    setMapLocation2: (cityName, lat, lng) => dispatch(setMapLocation2(cityName, lat, lng)),
    setMapImagesLocation: (cityName, lat, lng) => dispatch(setMapImagesLocation(cityName, lat, lng)),
  }
}

export default connect(null, mapDispatchToProps)(Search);

