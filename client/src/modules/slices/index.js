import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import authReducer, { authActions, name as authName } from './auth';

export const historyModule = createBrowserHistory();

export const rootReducer = combineReducers({
  router: connectRouter(historyModule),
  [authName]: authReducer,
});

export const actionsModule = {
  ...authActions,
};
