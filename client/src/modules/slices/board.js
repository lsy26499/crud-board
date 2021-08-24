import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../initialState';

export const name = 'board';

export const boardSlice = createSlice({
  name,
  initialState: { ...initialState.board },
  reducers: {
    getPostList: (state, action) => {},
    getPostListSuccess: (state, action) => {
      const { payload } = action;
      state.posts = payload.posts;
    },
    getPost: (state, action) => {},
    getPostSuccess: (state, action) => {
      const { payload } = action;
      state.currentPost = payload.post;
    },
    createPost: (state, action) => {},
    updatePost: (state, action) => {},
    deletePost: (state, action) => {},
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice.reducer;
