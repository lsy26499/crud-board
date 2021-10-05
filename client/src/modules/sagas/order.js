import { all, fork, takeLatest } from 'redux-saga/effects';
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
    const { nextRedirectURL } = data;
    window.open(nextRedirectURL);
  } catch (error) {
    console.log(error);
  }
}

function* kakaoPaymentReadyWatcher() {
  const { kakaoPaymentReady } = orderActions;
  yield takeLatest(kakaoPaymentReady, kakaoPaymentReadyRequest);
}

export default function* orderSaga() {
  yield all([fork(kakaoPaymentReadyWatcher)]);
}
