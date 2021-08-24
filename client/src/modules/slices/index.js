import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import commonReducer, { commonActions, name as commonName } from './common';
import authReducer, { authActions, name as authName } from './auth';
import boardReducer, { boardActions, name as boardName } from './board';

export const historyModule = createBrowserHistory();

export const rootReducer = combineReducers({
  router: connectRouter(historyModule),
  [commonName]: commonReducer,
  [authName]: authReducer,
  [boardName]: boardReducer,
});

export const actionsModule = {
  ...commonActions,
  ...authActions,
  ...boardActions,
};
