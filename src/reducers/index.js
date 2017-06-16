import { combineReducers } from 'redux';
import auth from './auth';
import menu from './menu';
import form from './form';

const rootReducer = combineReducers({
  auth,
  menu,
  form
});

export default rootReducer;
