import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { t2iReducer } from './Reducers/t2iReducer';
import { avatarReducer } from './Reducers/avatarReducer';
import { mainReducer } from './Reducers/mainReducer';
import { LogoGenReducer } from './Reducers/logoGenReducer';
import { removeBgReducer } from './Reducers/removeBgReducer';

const rootReducer = combineReducers({
  t2i: t2iReducer,
  avatar: avatarReducer,
  logo: LogoGenReducer,
  removeBg: removeBgReducer,
  main: mainReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
