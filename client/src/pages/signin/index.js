import { useState } from 'react';
import { Header } from '../../compoentns';
import { actions } from '../../modules/store';
import { useDispatch } from 'react-redux';

const SignIn = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || password === '') {
      alert('아이디와 비밀번호를 입력해주세요');
      return;
    }
    dispatch(actions.signIn({ name, password }));
  };

  const onChangeName = (e) => {
    const value = e.target.value;
    setName(value);
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
            name='name'
            value={name}
            onChange={onChangeName}
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
      </main>
    </div>
  );
};

export default SignIn;
