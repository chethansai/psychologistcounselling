import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import admin from './admin';
import dashboard from './dashboard';
export default combineReducers({
  alert,
  auth,
  profile,
  post,
  admin,
  dashboard
});
