import { useState } from 'react';
import { Header } from '../../compoentns';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    //! api call
  };

  const onChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
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
            placeholder='이메일'
            type='email'
            name='email'
            onChange={onChangeEmail}
          ></input>
          <input
            placeholder='비밀번호'
            type='password'
            name='password'
            onChange={onChangePassword}
          ></input>
          <button type='submit'>로그인</button>
        </form>
      </main>
    </div>
  );
};

export default SignIn;
