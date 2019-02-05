import { combineReducers } from 'redux';
import forcasts from './forcasts';
import maps from './maps';
import userInterface from './userInterface';

export default combineReducers({
  forcasts,
  maps,
  userInterface,
})
