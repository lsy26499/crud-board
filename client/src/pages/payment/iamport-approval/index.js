import { useSelector } from 'react-redux';

const IamportApproval = () => {
  const { result } = useSelector((state) => state.order);

  return (
    <main>
      <h3>결제 완료</h3>
      <div>{`주문번호: ${result.orderNumber}`}</div>
      <div>{`유저 id: ${result.userId}`}</div>
      <div>{`이메일: ${result.email}`}</div>
    </main>
  );
};

export default IamportApproval;
