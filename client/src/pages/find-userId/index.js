import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../modules/store';
import { Header } from '../../compoentns';
import './index.scss';

const FindUserId = () => {
  const [email, setEmail] = useState('');
  const { foundData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '') {
      alert('이메일을 입력해주세요');
      return;
    }
    dispatch(actions.findUserId({ email }));
  };

  const onChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  return (
    <div>
      <Header />
      <main className='find-id'>
        <h1 className='title'>아이디 찾기</h1>
        <div className='form-section'>
          <form className='find-id-form' onSubmit={onSubmit}>
            <input
              placeholder='이메일'
              type='email'
              name='email'
              value={email}
              onChange={onChangeEmail}
            ></input>
            <button type='submit'>확인</button>
          </form>
          {foundData && <div>{`아이디: ${foundData}`}</div>}
        </div>
      </main>
    </div>
  );
};

export default FindUserId;
