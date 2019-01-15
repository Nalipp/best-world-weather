import React from 'react';
import './index.css';
import App from './components/App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers';
import reduxThunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk)
);

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)

