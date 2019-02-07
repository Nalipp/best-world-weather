import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SelectedCityNavigation.css';

class SelectedCityNavigation extends Component {
  render() {
    const selected = this.props.selected;
    return (
      <ul className={"selected-city-navigation"}>
        <li 
          className={selected === 'maps' ? "selected-nav" : ''}
          onClick={this.props.handleSelect}
          id={'maps'}>Maps</li>
        <li
          className={selected === 'images' ? "selected-nav" : ''}
          onClick={this.props.handleSelect}
          id={'images'}>Images</li>
      </ul>
    )
  }
}

SelectedCityNavigation.propTypes = {
  handleSelect: PropTypes.func,
  selected: PropTypes.string,
}

export default SelectedCityNavigation;
