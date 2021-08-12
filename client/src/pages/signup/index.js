import { useState } from 'react';
import { Header } from '../../compoentns';

const SignUp = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    secondPassword: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    //! 비번 일치여부
    //! api call
  };

  const onChangeInputValues = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setValues({ ...values, [name]: value });
  };

  return (
    <div>
      <Header />
      <main>
        <h1>회원가입</h1>
        <form onSubmit={onSubmit}>
          <input
            placeholder='이메일'
            type='email'
            name='email'
            onChange={onChangeInputValues}
          ></input>
          <input
            placeholder='비밀번호'
            type='password'
            name='password'
            onChange={onChangeInputValues}
          ></input>
          <input
            placeholder='비밀번호 확인'
            type='secondPassword'
            name='secondPassword'
            onChange={onChangeInputValues}
          ></input>
          <button type='submit'>회원가입</button>
        </form>
      </main>
    </div>
  );
};

export default SignUp;
