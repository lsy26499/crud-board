import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { authActions } from '../slices/auth';
import { axios } from '../../utils';

function* signInRequest({ payload }) {
  try {
    const { email, password } = payload;
    const { data } = yield axios.post('/signin', { email, password });
    const { accessToken, tokenType } = data;
    const authorization = `${tokenType} ${accessToken}`;
    axios.defaults.headers['AccessToken'] = accessToken;
    axios.defaults.headers['Authorization'] = authorization;
    yield put(authActions.signInSuccess({ accessToken, tokenType }));
  } catch (error) {
    console.log(error);
  }
}

function* signUpRequest({ payload }) {
  try {
    yield axios.post('/signup', { ...payload });
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

export default function* authSaga() {
  yield all([fork(signInWatcher), fork(signUpWatcher)]);
}
