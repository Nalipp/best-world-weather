import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Loader.css';

class Loader extends Component {
  render() {
    const isShowing = this.props.loaderIsShowing ? 'show-loader' : 'hide-loader';
    return (
      <div className={`loader ${isShowing}`}>
        <div className="load-container">
          <div className="outer-ring"></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loaderIsShowing: state.userInterface.loaderIsShowing,
  }
}

export default connect(mapStateToProps, null)(Loader);
