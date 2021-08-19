import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../modules/store';
import { Header } from '../../compoentns';

const FindPassword = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const { foundData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || userId === '') {
      alert('아이디와 이메일을 입력해주세요');
      return;
    }
    dispatch(actions.findPassword({ email, userId }));
  };

  const onChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
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
            placeholder='이메일'
            type='email'
            name='email'
            value={email}
            onChange={onChangeEmail}
          ></input>
          <input
            placeholder='아이디'
            name='userId'
            value={userId}
            onChange={onChangeUserId}
          ></input>
          <button type='submit'>확인</button>
        </form>
        {foundData && <div>{`비밀번호: ${foundData}`}</div>}
      </main>
    </div>
  );
};

export default FindPassword;
