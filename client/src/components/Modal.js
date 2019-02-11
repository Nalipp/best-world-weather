import React, { Component } from 'react';
import './Modal.css';
import PropTypes from 'prop-types';
import { hideLocationDetail } from '../actions';
import { connect } from 'react-redux';

class Modal extends Component {
  render() {
    return (
      <div 
        className={`modal ${this.props.displayState}`}
        onClick={this.props.hideLocationDetail}>
      </div>
    )
  }
}

Modal.propTypes = {
  displayState: PropTypes.string,
}

const mapDispatchToProps = dispatch => {
  return {
    hideLocationDetail: () => dispatch(hideLocationDetail()),
  }
}

export default connect(null, mapDispatchToProps)(Modal);
