import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../initialState';

export const name = 'board';

export const boardSlice = createSlice({
  name,
  initialState: { ...initialState.board },
  reducers: {
    getPostList: (state, action) => {
      const { payload } = action;
      const { page, pageSize } = payload;
      state.pagination.page = page;
      state.pagination.pageSize = pageSize;
    },
    getPostListSuccess: (state, action) => {
      const { payload } = action;
      state.posts = payload.posts;
      state.pagination = payload.pagination;
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
