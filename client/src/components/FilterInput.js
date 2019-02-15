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
      value: '',
    }
  }
  componentDidMount() {
    this.setState({ value: this.props.currentValue });
  }
  hide = () => {
    this.props.hideInputFilter(this.props.name);
    this.props.removeCurrentFilter(this.props.name);
  }
  show = () => {
    this.props.showInputFilter(this.props.name);
    this.props.applyCurrentFilter(this.props.name);
  }
  handleChange = e => {
    const curValue = e.target.value;
    this.props.showInputFilter(this.props.name);
    this.setState({ value: curValue });
    this.props.updateCurrentValue(this.props.name, curValue)
  }
  render() {

    // min_temperature: 72,
    // max_humidity: 80,
    // min_sunlight: 10,

    const showingClass = this.props.isShowing ? null : 'showing';
    return (
      <div className={`filter-input ${showingClass}`}>
        <label 
          onClick={this.props.isShowing ? this.hide : this.show}>
          {this.props.label}
        </label>
        <div>
          <input 
            onChange={this.handleChange}
            type="range"
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            value={this.state.value}/>
        </div>
        <div>
          <span>{this.state.value}</span>
        </div>
      </div>
    )
  }
}

FilterInput.propTypes = {
  label: PropTypes.string,
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

