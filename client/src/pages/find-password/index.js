import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../modules/store';
import { Header } from '../../compoentns';
import { validateEmail } from '../../utils';
import './index.scss';

const FindPassword = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert('잘못된 이메일 주소입니다');
      return;
    }
    if (userId === '' || email === '') {
      alert('아이디와 이메일을 입력해주세요');
      return;
    }
    dispatch(actions.checkUser({ userId, email }));
  };

  const onChangeUserId = (e) => {
    const value = e.target.value;
    setUserId(value);
  };

  const onChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  return (
    <div>
      <Header />
      <main className='find-password'>
        <h1 className='title'>비밀번호 찾기</h1>
        <section className='form-section'>
          <form className='find-password-form' onSubmit={onSubmit}>
            <input
              placeholder='아이디'
              name='userId'
              value={userId}
              onChange={onChangeUserId}
            ></input>
            <input
              placeholder='이메일'
              name='email'
              value={email}
              onChange={onChangeEmail}
            ></input>
            <button type='submit'>확인</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default FindPassword;
