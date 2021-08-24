import { all } from 'redux-saga/effects';
import authSaga from './auth';
import boardSaga from './board';

export default function* rootSaga() {
  yield all([authSaga(), boardSaga()]);
}
