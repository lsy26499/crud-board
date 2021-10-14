import { all, fork, takeLatest, put, getContext } from 'redux-saga/effects';
import { orderActions } from '../slices/order';
import { axios } from '../../utils';

function* kakaoPaymentReadyRequest({ payload }) {
  try {
    const { productId, quantity } = payload;
    const params = { productId, quantity };
    const { data } = yield axios.post(
      `/payment/kakao/ready`,
      {},
      {
        params,
      }
    );
    const { nextRedirectURL, tid } = data;
    yield sessionStorage.setItem('tid', tid);
    yield window.open(
      `${nextRedirectURL}`,
      'new',
      'width = 500, height = 500, top = 100, left = 200'
    );
  } catch (error) {
    console.log(error);
  }
}

function* kakaoPaymentApprovalRequest({ payload }) {
  try {
    yield axios.post(`/payment/kakao/approve`, { ...payload });
    const history = yield getContext('history');
    history.push(`/payment/success`);
    sessionStorage.removeItem('tid');
  } catch (error) {
    console.log(error);
  }
}

function* iamportPaymentReadyRequest({ payload }) {
  try {
    const { productId, quantity } = payload;
    const params = { productId, quantity };
    const { data } = yield axios.post(
      `/payment/iamport/ready`,
      {},
      {
        params,
      }
    );
    yield put(orderActions.imaportPaymentReadySuccess({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

function* iamportPaymentApprovalRequest({ payload }) {
  try {
    const { productId, quantity, paid_amount, imp_uid, merchant_uid } = payload;
    const params = { productId, quantity };
    const { data } = yield axios.post(
      `/payment/iamport/approve`,
      { orderNumber: merchant_uid, imp_uid, paid_amount },
      { params }
    );
    yield put(orderActions.imaportPaymentSuccess({ ...data }));
    yield window.open(
      `/iamport/success`,
      'new',
      'width = 500, height = 500, top = 100, left = 200'
    );
  } catch (error) {
    console.log(error);
  }
}

function* iamportPaymentFailureRequest({ payload }) {
  try {
    const { orderNumber } = payload;
    const params = { orderNumber };
    yield axios.post(`/payment/iamport/failure`, {}, { params });
    yield put(orderActions.imaportPaymentReset());
    yield window.open(
      `/payment/fail`,
      'new',
      'width = 500, height = 500, top = 100, left = 200'
    );
  } catch (error) {
    console.log(error);
  }
}

function* kakaoPaymentReadyWatcher() {
  const { kakaoPaymentReady } = orderActions;
  yield takeLatest(kakaoPaymentReady, kakaoPaymentReadyRequest);
}

function* kakaoPaymentApprovalWatcher() {
  const { kakaoPaymentApproval } = orderActions;
  yield takeLatest(kakaoPaymentApproval, kakaoPaymentApprovalRequest);
}

function* iamportPaymentReadyWatcher() {
  const { imaportPaymentReady } = orderActions;
  yield takeLatest(imaportPaymentReady, iamportPaymentReadyRequest);
}

function* iamportPaymentApprovalWatcher() {
  const { imaportPaymentApproval } = orderActions;
  yield takeLatest(imaportPaymentApproval, iamportPaymentApprovalRequest);
}

function* iamportPaymentFailureWatcher() {
  const { imaportPaymentFailure } = orderActions;
  yield takeLatest(imaportPaymentFailure, iamportPaymentFailureRequest);
}

export default function* orderSaga() {
  yield all([
    fork(kakaoPaymentReadyWatcher),
    fork(kakaoPaymentApprovalWatcher),
    fork(iamportPaymentReadyWatcher),
    fork(iamportPaymentApprovalWatcher),
    fork(iamportPaymentFailureWatcher),
  ]);
}
