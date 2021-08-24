import {
  all,
  fork,
  put,
  takeEvery,
  getContext,
  select,
} from 'redux-saga/effects';
import { boardActions } from '../slices/board';
import { axios } from '../../utils';

function* getPostListRequest({ payload }) {
  try {
    const { data } = yield axios.get('/post-list');
    const { posts } = data;
    yield put(boardActions.getPostListSuccess({ posts }));
  } catch (error) {
    console.log(error);
    const {
      response: { data },
    } = error;
    alert(data);
  }
}

function* getPostRequest({ payload }) {
  try {
    const { id } = payload;
    const { data } = yield axios.get(`/post/${id}`);
    const { post } = data;
    yield put(boardActions.getPostSuccess({ post }));
  } catch (error) {
    console.log(error);
    const {
      response: { data },
    } = error;
    alert(data);
  }
}

function* createPostRequest({ payload }) {
  try {
    const { user } = yield select((state) => state.auth);
    const { id } = user;
    const { title, content } = payload;
    const { data } = yield axios.post('/post', {
      title,
      content,
      id,
    });
    const history = yield getContext('history');
    history.push(`/post/${data.id}`);
  } catch (error) {
    console.log(error);
    const {
      response: { data },
    } = error;
    alert(data);
  }
}

function* updatePostRequest({ payload }) {
  try {
    const { user } = yield select((state) => state.auth);
    const { title, content, id } = payload;
    yield axios.patch(`/post/${id}`, {
      title,
      content,
      author: user.id,
    });
    const history = yield getContext('history');
    history.push(`/post/${id}`);
  } catch (error) {
    console.log(error);
    const {
      response: { data },
    } = error;
    alert(data);
  }
}

function* deletePostRequest({ payload }) {
  try {
    // const { user } = yield select((state) => state.auth);
    const { id } = payload;
    yield axios.delete(`/post/${id}`, {});
    const history = yield getContext('history');
    history.push(`/`);
  } catch (error) {
    console.log(error);
    const {
      response: { data },
    } = error;
    alert(data);
  }
}

function* getPostListWatcher() {
  const { getPostList } = boardActions;
  yield takeEvery(getPostList, getPostListRequest);
}

function* getPostWatcher() {
  const { getPost } = boardActions;
  yield takeEvery(getPost, getPostRequest);
}

function* createPostWatcher() {
  const { createPost } = boardActions;
  yield takeEvery(createPost, createPostRequest);
}

function* updatePostWatcher() {
  const { updatePost } = boardActions;
  yield takeEvery(updatePost, updatePostRequest);
}

function* deletePostWatcher() {
  const { deletePost } = boardActions;
  yield takeEvery(deletePost, deletePostRequest);
}

export default function* boardSaga() {
  yield all([
    fork(getPostListWatcher),
    fork(getPostWatcher),
    fork(createPostWatcher),
    fork(updatePostWatcher),
    fork(deletePostWatcher),
  ]);
}
