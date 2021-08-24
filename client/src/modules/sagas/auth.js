import { all, fork, put, takeEvery, getContext } from 'redux-saga/effects';
import { authActions } from '../slices/auth';
import { axios } from '../../utils';

function* signInRequest({ payload }) {
  try {
    const { userId, password } = payload;
    const { data } = yield axios.post('/signin', { userId, password });
    const { accessToken, tokenType } = data;
    const authorization = `${tokenType} ${accessToken}`;
    const history = yield getContext('history');
    axios.defaults.headers['AccessToken'] = accessToken;
    axios.defaults.headers['Authorization'] = authorization;
    yield put(authActions.signInSuccess({ ...data }));
    yield history.replace('/');
  } catch (error) {
    console.log(error);
  }
}

function* signUpRequest({ payload }) {
  try {
    const history = yield getContext('history');
    yield axios.post('/signup', { ...payload });
    yield alert('회원가입 성공');
    yield history.replace('/sign-in');
  } catch (error) {
    console.log(error);
    const {
      response: { data },
    } = error;
    alert(data);
  }
}

function* findUserIdRequest({ payload }) {
  try {
    const { email } = payload;
    const { data } = yield axios.get(`/find-id/?email=${email}`);
    const { foundData } = data;
    yield put(authActions.setFoundUserData({ foundData }));
    const history = yield getContext('history');
    yield put(authActions.removeFoundUserData());
    yield history.push('/sign-in');
  } catch (error) {
    console.log(error);
    const {
      response: { data },
    } = error;
    alert(data);
  }
}

function* checkUserRequest({ payload }) {
  try {
    const { userId } = payload;
    const { data } = yield axios.get(`/check-user/?userId=${userId}`);
    const { user: foundData } = data;
    const history = yield getContext('history');
    if (data) {
      yield put(authActions.setFoundUserData({ foundData }));
      yield history.push('/update-password');
    }
  } catch (error) {
    console.log(error);
    const {
      response: { data },
    } = error;
    alert(data);
  }
}

function* updatePasswordRequest({ payload }) {
  try {
    const { data } = yield axios.patch(`/update-password`, { ...payload });
    const history = yield getContext('history');
    yield put(authActions.removeFoundUserData());
    alert(data);
    yield history.push('/sign-in');
  } catch (error) {
    console.log(error);
    const {
      response: { data },
    } = error;
    alert(data);
  }
}

function* signOutRequest() {
  try {
    axios.defaults.headers['AccessToken'] = null;
    axios.defaults.headers['Authorization'] = null;
  } catch (error) {
    console.log(error);
  }
}

function* signInWatcher() {
  const { signIn } = authActions;
  yield takeEvery(signIn, signInRequest);
}

function* signUpWatcher() {
  const { signUp } = authActions;
  yield takeEvery(signUp, signUpRequest);
}

function* findUserIdWatcher() {
  const { findUserId } = authActions;
  yield takeEvery(findUserId, findUserIdRequest);
}

function* checkUserWatcher() {
  const { checkUser } = authActions;
  yield takeEvery(checkUser, checkUserRequest);
}

function* updatePasswordWatcher() {
  const { updatePassword } = authActions;
  yield takeEvery(updatePassword, updatePasswordRequest);
}

function* signOutWatcher() {
  const { signOut } = authActions;
  yield takeEvery(signOut, signOutRequest);
}

export default function* authSaga() {
  yield all([
    fork(signInWatcher),
    fork(signUpWatcher),
    fork(findUserIdWatcher),
    fork(checkUserWatcher),
    fork(updatePasswordWatcher),
    fork(signOutWatcher),
  ]);
}
