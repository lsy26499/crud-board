import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from '../../../modules/store';

const KakaoApproval = () => {
  const history = useHistory();
  const search = history.location.search;
  //! 이부분

  const onClickApprovalButton = () => {
    // dispatch(actions.kakaoPaymentApproval({ partner_order_id, pg_token }));
  };

  return (
    <main>
      <h3>결제를 완료해주세요</h3>
      <button onClick={onClickApprovalButton}>결제 완료</button>
    </main>
  );
};

export default KakaoApproval;
