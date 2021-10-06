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
import { actions } from '../store';

function* getPostListRequest({ payload }) {
  const { pagination, search } = yield select((state) => state.board);
  const { page, pageSize } = pagination;
  try {
    const { data } = yield axios.get(`/post-list`, {
      params: { page, pageSize, search },
    });
    yield put(boardActions.getPostListSuccess({ ...data }));
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
  const { title, content, summary, images } = payload;
  const postObj = {
    title,
    content,
    summary,
  };

  const formData = new FormData();
  images.forEach((image) => {
    formData.append('images', image);
  });
  formData.append('post', JSON.stringify(postObj));
  try {
    const { data } = yield axios.post('/post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const history = yield getContext('history');
    history.push(`/post/${data.id}`);
  } catch (error) {
    console.log(error);
    const {
      response: { data, status },
    } = error;
    if (status === 401) {
      const history = yield getContext('history');
      yield put(actions.signOut());
      history.push('/');
    }
    alert(data);
  }
}

function* updatePostRequest({ payload }) {
  const { title, content, summary, images, id } = payload;
  const postObj = {
    title,
    content,
    summary,
  };
  const formData = new FormData();
  images.forEach((image) => {
    formData.append('images', image);
  });
  formData.append('post', JSON.stringify(postObj));
  try {
    yield axios.patch(`/post/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const history = yield getContext('history');
    history.push(`/post/${id}`);
  } catch (error) {
    console.log(error);
    const {
      response: { data, status },
    } = error;
    if (status === 401) {
      const history = yield getContext('history');
      yield put(actions.signOut());
      history.push('/');
    }
    alert(data);
  }
}

function* deletePostRequest({ payload }) {
  try {
    const { id } = payload;
    yield axios.delete(`/post/${id}`, {});
    const history = yield getContext('history');
    history.push(`/`);
  } catch (error) {
    console.log(error);
    const {
      response: { data, status },
    } = error;
    if (status === 401) {
      const history = yield getContext('history');
      yield put(actions.signOut());
      history.push('/');
    }
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
