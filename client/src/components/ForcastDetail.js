import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideSingleForcast } from '../actions';

class ForcastDetail extends Component {
  render() {
    const forcast = this.props.singleForcast;

    return (
      <div>
        {forcast && 
          <div>
            <span onClick={this.props.hideSingleForcast}>x</span>
            <ul>
              <li>{forcast.cityName}</li>
              <li>{forcast.summary}</li>
              <li>{forcast.temperature}</li>
              <li>{forcast.windSpeed}</li>
              <li>{Math.floor(forcast.cloudCover)}</li>
            </ul>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleForcast: state.forcasts.singleForcast,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideSingleForcast: () => dispatch(hideSingleForcast()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForcastDetail);
