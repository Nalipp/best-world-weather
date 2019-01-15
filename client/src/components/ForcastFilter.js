import React, { Component } from 'react';
import './ForcastFilter.css';
import { connect } from 'react-redux';

class ForcastFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <form className={'forcast-filter'}>
        <input />
        <button type="button">update</button>
      </form>
    )
  }
}

export default connect()(ForcastFilter);
