import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
         loadCityPopulations,
         getForcast, 
         setMapLocation1,
         setMapLocation2, 
         setMapImagesLocation } from '../actions';
import { getGeoCode } from '../helpers/geoCoding';
import { getChoiceList, generateCitySearchTree } from '../helpers/getCityPopulations';
import PropTypes from 'prop-types';
import './Search.css';


class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      choiceList: [],
    }
  }

  componentDidMount() {
    this.props.loadCityPopulations();
  }
  componentWillMount() {
    document.addEventListener('mousedown', this.resetSearch, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.resetSearch, false)
  }
  
  resetSearch = e => {
    const id = e.target.id;
    if (id !== 'search-city_name' && id !== 'search-list_item') {
      this.setState({
        value: '',
        choiceList: [],
      });
    }
  }

  handleDropdownSubmit = (cityName, lat, lng) => {
    this.props.getForcast(cityName, lat, lng)
    this.setState({
      value: '',
      choiceList: [],
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const cityName = this.state.value;
    const { searchType,
            getForcast,
            setMapLocation1,
            setMapLocation2,
            setMapImagesLocation } = this.props;

    getGeoCode(cityName, (lat, lng) => {
      if (searchType === 'getForcast') getForcast(cityName, lat, lng);
      if (searchType === 'mapLocation1') setMapLocation1(cityName, lat, lng);
      if (searchType === 'mapLocation2') setMapLocation2(cityName, lat, lng);
      if (searchType === 'mapImagesLocation') setMapImagesLocation(cityName, lat, lng);
    });

    this.setState({ 
      value: '',
      choiceList: [],
    });
  }

  handleChange = (e) => {
    const curValue = e.target.value;

    this.setState({ 
      value: curValue,
      choiceList: getChoiceList(curValue),
    });
  }

  render() {
    return (
      <div className={'search'}>
        <form onSubmit={this.handleSubmit}>
          <input 
            id="city"
            placeholder="Select City"
            onChange={this.handleChange}
            value={this.state.value}
            autoFocus={true}
          />
        </form>
        <div className="search_choice-list">
          {this.state.choiceList && <ul>
            {this.state.choiceList.map(city => (
              <li 
                onClick={this.handleDropdownSubmit.bind(this, city[0], city[2], city[3])} 
                id='search-list_item'
                key={city[0] + Math.random()}>
                <span id='search-city_name'>{city[0]}</span>
                <span>pop : {city[1]}</span>
              </li>
            ))}
          </ul>}
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  searchType: PropTypes.string,
}

const mapStateToProps = state => {
  if (state.maps.cityPopulations.length > 0) {
    generateCitySearchTree(state.maps.cityPopulations);
  }
  return {
    cityPopulations: state.maps.cityPopulations,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCityPopulations: () => dispatch(loadCityPopulations()),
    getForcast: (cityName, lat, lng) => dispatch(getForcast(cityName, lat, lng)),
    setMapLocation1: (cityName, lat, lng) => dispatch(setMapLocation1(cityName, lat, lng)),
    setMapLocation2: (cityName, lat, lng) => dispatch(setMapLocation2(cityName, lat, lng)),
    setMapImagesLocation: (cityName, lat, lng) => dispatch(setMapImagesLocation(cityName, lat, lng)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

