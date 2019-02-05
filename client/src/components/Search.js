import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getForcast, setMapLocation1, setMapLocation2 } from '../actions';
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

    getGeoCode(cityName, (lat, lng) => {
      if (this.props.searchType === 'getForcast') {
        this.props[this.props.searchType](cityName, lat, lng);
      } else {
        let searchType = 'setM' + this.props.searchType.slice(1);
        this.props[searchType](cityName, lat, lng);
      }
    });

    this.setState({ value: '' });
  }
  handleChange = (e) => {
    this.setState({value: e.target.value})
  }
  render() {
    return (
      <div className={`search ${this.props.searchType}`}>
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
  }
}

export default connect(null, mapDispatchToProps)(Search);

