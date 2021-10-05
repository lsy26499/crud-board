import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import commonReducer, { commonActions, name as commonName } from './common';
import authReducer, { authActions, name as authName } from './auth';
import boardReducer, { boardActions, name as boardName } from './board';
import orderReducer, { orderActions, name as orderName } from './order';

export const historyModule = createBrowserHistory();

export const rootReducer = combineReducers({
  router: connectRouter(historyModule),
  [commonName]: commonReducer,
  [authName]: authReducer,
  [boardName]: boardReducer,
  [orderName]: orderReducer,
});

export const actionsModule = {
  ...commonActions,
  ...authActions,
  ...boardActions,
  ...orderActions,
};
