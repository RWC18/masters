import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { t2iReducer } from './Reducers/t2iReducer';
import { i2iReducer } from './Reducers/i2iReducer';
import { mainReducer } from './Reducers/mainReducer';
import { LogoGenReducer } from './Reducers/logoGenReducer';

const rootReducer = combineReducers({
  t2i: t2iReducer,
  i2i: i2iReducer,
  logo: LogoGenReducer,
  main: mainReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
