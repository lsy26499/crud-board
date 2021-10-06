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
    pagination: {
      page: 0,
      pageSize: 5,
      totalPages: 1,
      totalItems: 0,
    },
    search: null,
    currentPost: {
      loading: false,
    },
  },
  product: {
    id: 1,
    quantity: 1,
  },
};
