import { combineReducers } from '@reduxjs/toolkit';

import authReducer, { authActions, name as authName } from './auth';

export const rootReducer = combineReducers({
  [authName]: authReducer,
});

export const actionsModule = {
  ...authActions,
};
