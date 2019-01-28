import React, { Component } from 'react';
import './App.css';
import ForcastFilter from './ForcastFilter';
import ForcastList from './ForcastList';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Best City Weather</h1>
        <ForcastFilter />
        <Search />
        <ForcastList />
      </div>
    )
  }
}

export default App;
