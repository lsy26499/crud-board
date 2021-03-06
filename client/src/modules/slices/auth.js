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
      const { user, accessToken, tokenType, cid } = payload;
      state.accessToken = accessToken;
      state.tokenType = tokenType;
      state.isLoggedIn = true;
      state.cid = cid;
      state.user = user;
    },
    signUp: (state, action) => {},
    findUserId: (state, action) => {},
    checkUser: (state, action) => {},
    updatePassword: (state, action) => {},
    setFoundUserData: (state, action) => {
      const { payload } = action;
      const { foundData } = payload;
      state.foundData = foundData;
    },
    removeFoundUserData: (state, action) => {
      state.foundData = null;
    },
    signOut: (state, action) => {
      state.accessToken = null;
      state.tokenType = null;
      state.isLoggedIn = false;
      state.user = {
        id: null,
        userId: null,
        email: null,
      };
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
