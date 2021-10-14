import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../initialState';

export const name = 'order';

export const orderSlice = createSlice({
  name,
  initialState: { ...initialState.order },
  reducers: {
    kakaoPaymentReady: (state, action) => {},
    kakaoPaymentApproval: (state, action) => {},
    imaportPaymentReady: (state, action) => {},
    imaportPaymentReadySuccess: (state, action) => {
      const { payload } = action;
      state.orderNumber = payload.orderNumber;
    },
    imaportPaymentApproval: (state, action) => {},
    imaportPaymentSuccess: (state, action) => {
      const { payload } = action;
      state.result = { ...payload };
      state.orderNumber = null;
    },
    imaportPaymentFailure: (state, action) => {},
    imaportPaymentReset: (state, action) => {
      state.orderNumber = null;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
