import { all } from 'redux-saga/effects';
import authSaga from './auth';
import boardSaga from './board';
import orderSaga from './order';

export default function* rootSaga() {
  yield all([authSaga(), boardSaga(), orderSaga()]);
}
