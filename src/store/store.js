import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'; 
import tweetReducer from './tweetslice';
import authReducer from './authSlice'; 

const rootReducer = combineReducers({
  tweets: tweetReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer, 
});
