import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideSingleForcast } from '../actions';
import './ForcastDetail.css';

class ForcastDetail extends Component {
  render() {
    const forcast = this.props.singleForcast;

    return (
      <div>
        {forcast && <div className={'forcast-detail'}>
            <ul>
              <li>
                <span>city</span>
                <span>{forcast.cityName}</span>
              </li>
              <li>
                <span>summary</span>
                <span>{forcast.summary}</span>
              </li>
              <li>
                <span>temp</span>
                <span>{Math.floor(forcast.temperature)}</span>
              </li>
              <li>
                <span>wind</span>
                <span>{Math.floor(forcast.windSpeed)}</span>
              </li>
              <li>
                <span>% cloud</span>
                <span>{Math.floor(forcast.cloudCover)}</span>
              </li>
            </ul>
            <span onClick={this.props.hideSingleForcast}>x</span>
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
