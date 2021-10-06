import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from '../../../modules/store';
import queryString from 'query-string';

const KakaoApproval = () => {
  const history = useHistory();
  const search = history.location.search;
  const query = queryString.parse(search);
  const tid = sessionStorage.getItem('tid');
  const dispatch = useDispatch();

  const onClickApprovalButton = () => {
    console.log(tid);
    dispatch(actions.kakaoPaymentApproval({ ...query, tid }));
  };

  return (
    <main>
      <h3>결제를 완료해주세요</h3>
      <button onClick={onClickApprovalButton}>결제 완료</button>
    </main>
  );
};

export default KakaoApproval;
