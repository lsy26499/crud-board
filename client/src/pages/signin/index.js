import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../../compoentns';
import { actions } from '../../modules/store';
import { useDispatch } from 'react-redux';

const SignIn = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    if (userId === '' || password === '') {
      alert('아이디와 비밀번호를 입력해주세요');
      return;
    }
    dispatch(actions.signIn({ userId, password }));
  };

  const onChangeUserId = (e) => {
    const value = e.target.value;
    setUserId(value);
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  return (
    <div>
      <Header />
      <main>
        <h1>로그인</h1>
        <form onSubmit={onSubmit}>
          <input
            placeholder='아이디'
            name='userId'
            value={userId}
            onChange={onChangeUserId}
          ></input>
          <input
            placeholder='비밀번호'
            type='password'
            name='password'
            value={password}
            onChange={onChangePassword}
          ></input>
          <button type='submit'>로그인</button>
        </form>
        <nav>
          <div onClick={() => history.push('/find-id')}>아이디 찾기</div>
          <div onClick={() => history.push('/find-password')}>
            비밀번호 찾기
          </div>
        </nav>
      </main>
    </div>
  );
};

export default SignIn;
