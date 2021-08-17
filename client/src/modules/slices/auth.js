import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../initialState';

export const name = 'auth';

export const authSlice = createSlice({
  name,
  initialState: { ...initialState.auth },
  reducers: {
    signIn: (state, action) => {},
    signInSuccess: (state, action) => {
      const { payload } = action;
      const { accessToken, tokenType } = payload;
      state.accessToken = accessToken;
      state.tokenType = tokenType;
    },
    signUp: (state, action) => {},
    checkIsEmailExist: (state, action) => {},
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
