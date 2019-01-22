import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ForcastTable.css';

class ForcastTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedArr: null,
      sortedby: null,
    }
  }
  handleSort = (e) => {
    const id = e.target.id;
    let arrCopy = this.props.forcasts.slice();

    if (this.state.sortedBy === id) {
      this.setState({
        sortedArr: this.state.sortedArr.reverse(),
        sortedBy: null,
      });
    } else {
      arrCopy.sort((a, cityObject) => {
        return cityObject[id] < a[id] ? 1 : -1;
      });
      this.setState({
        sortedArr: arrCopy,
        sortedBy: id,
      });
    }
  }

  render() {
    let forcasts = this.state.sortedArr || this.props.forcasts;
    return (
      <table className="forcast-table">
        <thead>
          <tr onClick={this.handleSort}>
            <th id="cityName">city</th>
            <th id="summary">summray</th>
            <th id="temperature">temperature</th>
            <th id="windSpeed">wind speed</th>
            <th id="cloudCover">cloud cover</th>
          </tr>
        </thead>
        {forcasts.map(forcast => (
          <tbody key={forcast.cityName}>
            <tr>
              <td>{forcast.cityName}</td>
              <td>{forcast.summary}</td>
              <td>{forcast.temperature}</td>
              <td>{forcast.windSpeed}</td>
              <td>{Math.floor(forcast.cloudCover)}</td>
            </tr>
          </tbody>
        ))}
      </table>
    )
  }
}

ForcastTable.propTypes = {
  forcasts: PropTypes.array,
}

export default ForcastTable;
