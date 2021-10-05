import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../modules/store';

const KakaoApproval = () => {
  const {
    partner_order_id: orderId,
    partner_user_id: userId,
    pg_token,
  } = useParams;

  const onClickApprovalButton = () => {};

  return (
    <main>
      <h3>결제를 완료해주세요</h3>
      <button onClick={onClickApprovalButton}>결제 완료</button>
    </main>
  );
};

export default KakaoApproval;
