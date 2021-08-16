import { useState } from 'react';
import { Header } from '../../compoentns';
import { validateEmail } from '../../utils';

const SignUp = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    secondPassword: '',
  });
  const [emailError, setEmailError] = useState(false);

  const onClickCheckEmailButton = () => {
    //! api call
  };

  const onChangeInputValues = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'email') {
      if (!validateEmail(value)) {
        setEmailError('잘못된 이메일 형식입니다');
      }
      if (value === '') {
        setEmailError(false);
      }
    }

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, secondPassword } = values;
    const isInputEmpty = Boolean(
      Object.values(values).filter((item) => item === '').length
    );

    if (isInputEmpty) {
      alert('모든 항목을 작성해주세요');
      return;
    }

    if (password !== secondPassword) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }

    //! api call
  };

  return (
    <div>
      <Header />
      <main>
        <h1>회원가입</h1>
        <form onSubmit={onSubmit}>
          <input
            placeholder='이름'
            type='name'
            name='name'
            onChange={onChangeInputValues}
          ></input>
          <div>
            <input
              placeholder='이메일'
              type='email'
              name='email'
              onChange={onChangeInputValues}
            ></input>
            <div onClick={onClickCheckEmailButton}>중복확인</div>
            <span>{emailError}</span>
          </div>
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
