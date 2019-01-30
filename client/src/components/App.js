import React, { Component } from 'react';
import Heading from './Heading';
import ForcastFilter from './ForcastFilter';
import ForcastList from './ForcastList';
import Footer from './Footer';
import Search from './Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className={"app"}>
        <Heading />
        <ForcastFilter />
        <Search />
        <ForcastList />
        <Footer />
      </div>
    )
  }
}

export default App;
