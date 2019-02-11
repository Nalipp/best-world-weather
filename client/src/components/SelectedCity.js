import React, { Component } from 'react';
import Search from './Search';
import SelectedCityNavigation from './SelectedCityNavigation';
import ForcastDetailContainer from './ForcastDetailContainer';
import MapCompareContainer from './MapCompareContainer';
import MapImagesContainer from './MapImagesContainer';
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
    return (
      <div>
        <Search searchType={'getForcast'} />
        <SelectedCityNavigation 
          handleSelect={this.handleSelect}
          selected={this.state.selected} />
        {this.state.selected === 'data' && <ForcastDetailContainer />}
        {this.state.selected === 'maps' && <MapCompareContainer />}
        {this.state.selected === 'images' && <MapImagesContainer />}
      </div>
    )
  }
}

export default SelectedCity;

