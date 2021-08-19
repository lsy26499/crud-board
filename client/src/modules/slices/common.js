import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../initialState';

export const name = 'common';

export const commonSlice = createSlice({
  name,
  initialState: { ...initialState.common },
  reducers: {
    toggleShowModal: (state, action) => {
      const { payload } = action;
      state.showModal = payload.showModal;
    },
  },
});

export const commonActions = commonSlice.actions;

export default commonSlice.reducer;
