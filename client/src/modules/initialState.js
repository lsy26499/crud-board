export const initialState = {
  common: {
    showModal: false,
  },
  auth: {
    accessToken: null,
    tokenType: null,
    isLoggedIn: false,
    foundData: null,
    user: {
      id: null,
      userId: null,
      email: null,
    },
  },
  board: {
    posts: [],
    currentPost: {},
  },
};
