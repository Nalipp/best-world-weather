import React, { Component } from 'react';
import { getForcasts } from '../actions/index';
import { connect } from 'react-redux';
import ForcastTable from './ForcastTable';
import ForcastDetail from './ForcastDetail';
import './ForcastList.css';

class ForcastList extends Component {
  componentDidMount() {
    this.props.getForcasts();
  }

  render() {
    return (
      <div className={'forcast-list'}>
        <ForcastDetail />
        <ForcastTable />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getForcasts: () => dispatch(getForcasts())
  }
}

export default connect(null, mapDispatchToProps)(ForcastList);
