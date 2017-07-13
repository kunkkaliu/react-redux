import { combineReducers } from 'redux';
import auth from './auth';
import menu from './menu';
import form from './form';
import load from './load';

const rootReducer = combineReducers({
  auth,
  menu,
  form,
  load
});

export default rootReducer;
