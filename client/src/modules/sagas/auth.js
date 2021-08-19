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
    yield put(authActions.signInSuccess({ accessToken, tokenType }));
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

function* signOutWatcher() {
  const { signOut } = authActions;
  yield takeEvery(signOut, signOutRequest);
}

export default function* authSaga() {
  yield all([fork(signInWatcher), fork(signUpWatcher), fork(signOutWatcher)]);
}
