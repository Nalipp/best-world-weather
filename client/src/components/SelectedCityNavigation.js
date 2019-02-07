import React, { Component } from 'react';
import './SelectedCityNavigation.css';

class SelectedCityNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'maps',
    }
  }
  handleSelect = (e) => {
    this.setState({ selected: e.target.id })
  }
  render() {
    const selected = this.state.selected;
    return (
      <ul className={"selected-city-navigation"}>
        <li 
          className={selected === 'maps' ? "selected-nav" : ''}
          onClick={this.handleSelect}
          id={'maps'}>Maps</li>
        <li
          className={selected === 'images' ? "selected-nav" : ''}
          onClick={this.handleSelect}
          id={'images'}>Images</li>
      </ul>
    )
  }
}

export default SelectedCityNavigation;
