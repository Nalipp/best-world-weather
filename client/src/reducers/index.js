import { combineReducers } from 'redux';
import forcasts from './forcasts';
import maps from './maps';
import errorMessages from './error_messages';

export default combineReducers({
  forcasts,
  maps,
  errorMessages,
})
