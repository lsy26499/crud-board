import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../initialState';

export const name = 'order';

export const orderSlice = createSlice({
  name,
  initialState: { ...initialState.order },
  reducers: {
    kakaoPaymentReady: (state, action) => {},
    kakaoPaymentReadySuccess: (state, action) => {
      const { payload } = action;
      state.nextRedirectURL = payload.nextRedirectURL;
    },
    kakaoPaymentApproval: (state, action) => {},
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
