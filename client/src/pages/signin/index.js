import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Main } from '../../compoentns';
import { actions } from '../../modules/store';
import { useDispatch } from 'react-redux';
import './index.scss';

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
      <Main>
        <div className='login-container'>
          <h1 className='title'>로그인</h1>
          <form className='form' onSubmit={onSubmit}>
            <div className='form-item'>
              <label htmlFor='userId'>아이디</label>
              <input
                placeholder='아이디'
                name='userId'
                value={userId}
                onChange={onChangeUserId}
              ></input>
            </div>
            <div className='form-item'>
              <label htmlFor='userId'>비밀번호</label>
              <input
                placeholder='비밀번호'
                type='password'
                name='password'
                value={password}
                onChange={onChangePassword}
              ></input>
            </div>
            <button type='submit'>로그인</button>
          </form>
          <nav>
            <span onClick={() => history.push('/find-id')}>아이디 찾기</span>
            <span className='bar'> | </span>
            <span onClick={() => history.push('/find-password')}>
              비밀번호 찾기
            </span>
          </nav>
        </div>
      </Main>
    </div>
  );
};

export default SignIn;
