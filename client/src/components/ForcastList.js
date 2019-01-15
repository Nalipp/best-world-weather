import React, { Component } from 'react';
import { getForcasts } from '../actions/index';
import { connect } from 'react-redux';
import ForcastTable from './ForcastTable';
import './ForcastList.css';

class ForcastList extends Component {
  componentDidMount() {
    this.props.getForcasts();
  }

  render() {
    return (
      <div className={'forcast-list'}>
        <ForcastTable forcasts={this.props.forcasts} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    forcasts: state.forcasts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getForcasts: () => dispatch(getForcasts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForcastList);
