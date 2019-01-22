import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './FilterInput.css';
import { 
  updateCurrentValue,
  applyCurrentFilter,
  removeCurrentFilter,
  showInputFilter,
  hideInputFilter 
} from '../actions';

class FilterInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.currentValue, // move to component did mount
    }
    this.startIncrease = this.startIncrease.bind(this); // make arrow
    this.startDecrease = this.startDecrease.bind(this);
    this.stopIncrement = this.stopIncrement.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }
  hide() {
    this.props.hideInputFilter(this.props.name);
    this.props.removeCurrentFilter(this.props.name);
  }
  show() {
    this.props.showInputFilter(this.props.name);
    this.props.applyCurrentFilter(this.props.name);
  }
  startIncrease() {
    this.show();
    this.setState({value: this.state.value + 1}, () => {
      this.props.updateCurrentValue(this.props.name, this.state.value);
    });
    this.incrementId = setInterval(() => {
      this.setState({value: this.state.value + 1}, () => {
        this.props.updateCurrentValue(this.props.name, this.state.value);
      });
    }, 200);
  }
  startDecrease() {
    this.show();
    this.setState({value: this.state.value - 1}, () => {
      this.props.updateCurrentValue(this.props.name, this.state.value);
    });
    this.incrementId = setInterval(() => {
      this.setState({value: this.state.value - 1}, () => {
        this.props.updateCurrentValue(this.props.name, this.state.value);
      });
    }, 200);
  }
  stopIncrement() {
    clearInterval(this.incrementId);
  }
  render() {
    return (
      <div className={'filter-input'} 
           style={!this.props.isShowing ? {color: '#bbb'} : null}>
        {this.props.isShowing 
          ?
          <button onClick={this.hide} type="button">X</button>
          :
          <button onClick={this.show} type="button">O</button>}
        <label>{this.props.name}
          <button 
            onMouseDown={this.startDecrease} 
            onMouseUp={this.stopIncrement} 
            type="button">-</button>
          <input type="hidden" value={this.state.value}/>
          <span>{this.props.currentValue}</span>
          <button 
            onMouseDown={this.startIncrease} 
            onMouseUp={this.stopIncrement} 
            type="button">+</button>
        </label>
      </div>
    )
  }
}

FilterInput.propTypes = {
  name: PropTypes.string,
}

const mapStateToProps = (state, props) => {
  return {
    isShowing: state.forcasts.isShowing[props.name],
    forcastState: state.forcasts,
    currentValue: state.forcasts.currentValues[props.name],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentValue: (name, val) => dispatch(updateCurrentValue(name, val)),
    applyCurrentFilter: filterName => dispatch(applyCurrentFilter(filterName)),
    removeCurrentFilter: filterName => dispatch(removeCurrentFilter(filterName)),
    showInputFilter: filterName => dispatch(showInputFilter(filterName)),
    hideInputFilter: filterName => dispatch(hideInputFilter(filterName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterInput);

