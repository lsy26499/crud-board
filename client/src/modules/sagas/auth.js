import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { authActions } from '../slices/auth';
import { axios } from '../../utils';
import { historyModule } from '../slices';

function* signInRequest({ payload }) {
  try {
    const { name, password } = payload;
    const { data } = yield axios.post('/signin', { name, password });
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
    const {
      response: { data },
    } = error;
    alert(data);
  }
}

function* checkIsEmailExistRequest({ payload }) {
  try {
    const { email } = payload;
    const { data } = yield axios.get(`/check-email`, { params: { email } });
    const { isEmailExist } = data;
    if (isEmailExist) {
      alert('이미 존재하는 이메일입니다.');
    } else {
      alert('사용 가능한 이메일입니다');
    }
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

function* checkIsEmailExistWatcher() {
  const { checkIsEmailExist } = authActions;
  yield takeEvery(checkIsEmailExist, checkIsEmailExistRequest);
}

export default function* authSaga() {
  yield all([
    fork(signInWatcher),
    fork(signUpWatcher),
    fork(checkIsEmailExistWatcher),
  ]);
}
