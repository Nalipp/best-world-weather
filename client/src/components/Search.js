import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getForcast, setMapLocation2 } from '../actions';
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
  handleGetForcast = (e) => {
    e.preventDefault();
    const cityName = this.state.value;

    getGeoCode(cityName, (lat, lng) => {
      let searchType = this.props.searchType;
      this.props[searchType](cityName, lat, lng);
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
    setMapLocation2: (cityName, lat, lng) => dispatch(setMapLocation2(cityName, lat, lng)),
  }
}

export default connect(null, mapDispatchToProps)(Search);

