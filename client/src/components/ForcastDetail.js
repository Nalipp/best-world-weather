import React, { Component } from 'react';
import { connect } from 'react-redux';

class ForcastDetail extends Component {
  render() {
    const forcast = this.props.singleForcast;

    return (
      <div>
        {forcast && <ul>
          <li>{forcast.cityName}</li>
          <li>{forcast.summary}</li>
          <li>{forcast.temperature}</li>
          <li>{forcast.windSpeed}</li>
          <li>{Math.floor(forcast.cloudCover)}</li>
        </ul>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleForcast: state.forcasts.singleForcast,
  }
}

export default connect(mapStateToProps, null)(ForcastDetail);
