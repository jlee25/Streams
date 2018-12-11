import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as formReducer } from 'redux-form';
import streamReducer from './streamReducers';

export default combineReducers({
   auth: authReducer,
   form: formReducer, // from installing redux-form
   streams: streamReducer
});