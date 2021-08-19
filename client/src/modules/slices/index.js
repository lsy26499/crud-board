import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import authReducer, { authActions, name as authName } from './auth';
import commonReducer, { commonActions, name as commonName } from './common';

export const historyModule = createBrowserHistory();

export const rootReducer = combineReducers({
  router: connectRouter(historyModule),
  [commonName]: commonReducer,
  [authName]: authReducer,
});

export const actionsModule = {
  ...commonActions,
  ...authActions,
};
