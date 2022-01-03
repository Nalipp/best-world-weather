import React, { Component } from 'react';
import Search from './Search';
import SelectedCityNavigation from './SelectedCityNavigation';
import ForcastDetail from './ForcastDetail';
import MapCompareContainer from './MapCompareContainer';
import MapImagesContainer from './MapImagesContainer';
import { connect } from 'react-redux';
import './SelectedCityContainer.css';

class SelectedCityContainer extends Component {
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
      <div className={`selected-city-container ${displayStatus}`}>
        <div>
          <Search searchType={'getForcast'} />
          <SelectedCityNavigation 
            handleSelect={this.handleSelect}
            selected={this.state.selected} />
          {this.state.selected === 'data' && <ForcastDetail />}
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

export default connect(mapStateToProps, null)(SelectedCityContainer);
