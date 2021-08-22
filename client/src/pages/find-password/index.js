import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../modules/store';
import { Header } from '../../compoentns';

const FindPassword = () => {
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (userId === '') {
      alert('아이디를 입력해주세요');
      return;
    }
    dispatch(actions.checkUser({ userId }));
  };

  const onChangeUserId = (e) => {
    const value = e.target.value;
    setUserId(value);
  };

  return (
    <div>
      <Header />
      <main>
        <h1>비밀번호 찾기</h1>
        <form onSubmit={onSubmit}>
          <input
            placeholder='아이디'
            name='userId'
            value={userId}
            onChange={onChangeUserId}
          ></input>
          <button type='submit'>확인</button>
        </form>
      </main>
    </div>
  );
};

export default FindPassword;
