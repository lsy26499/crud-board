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
    console.log(payload);
    yield axios.post(`/payment/kakao/approve`, { ...payload });
    const history = yield getContext('history');
    history.push(`/payment/success`);
    sessionStorage.removeItem('tid');
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

export default function* orderSaga() {
  yield all([
    fork(kakaoPaymentReadyWatcher),
    fork(kakaoPaymentApprovalWatcher),
  ]);
}
