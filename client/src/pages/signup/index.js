import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../modules/store';
import { Header, Main } from '../../compoentns';
import { validateEmail } from '../../utils';
import './index.scss';

const SignUp = () => {
  const [values, setValues] = useState({
    userId: '',
    email: '',
    password: '',
    secondPassword: '',
  });
  const dispatch = useDispatch();

  const onChangeInputValues = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { userId, email, password, secondPassword } = values;
    const isInputEmpty = Boolean(
      Object.values(values).filter((item) => item.trim() === '').length
    );

    if (!validateEmail(email)) {
      alert('잘못된 이메일 주소입니다');
      return;
    }

    if (isInputEmpty) {
      alert('모든 항목을 작성해주세요');
      return;
    }

    if (password !== secondPassword) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }
    dispatch(actions.signUp({ userId, email, password }));
  };

  return (
    <div>
      <Header />
      <Main>
        <div className='signin-container'>
          <h1 className='title'>회원가입</h1>
          <form className='form' onSubmit={onSubmit}>
            <div className='form-item'>
              <label htmlFor='userId'>아이디</label>
              <input
                placeholder='아이디'
                name='userId'
                value={values.userId}
                onChange={onChangeInputValues}
              ></input>
            </div>
            <div className='form-item'>
              <label htmlFor='email'>이메일</label>
              <input
                placeholder='이메일'
                type='email'
                name='email'
                value={values.email}
                onChange={onChangeInputValues}
              ></input>
            </div>
            <div className='form-item'>
              <label htmlFor='password'>비밀번호</label>
              <input
                placeholder='비밀번호'
                type='password'
                name='password'
                value={values.password}
                onChange={onChangeInputValues}
              ></input>
            </div>
            <div className='form-item'>
              <label htmlFor='secondPassword'>비밀번호 확인</label>
              <input
                placeholder='비밀번호 확인'
                type='password'
                name='secondPassword'
                value={values.secondPassword}
                onChange={onChangeInputValues}
              ></input>
            </div>
            <button type='submit'>회원가입</button>
          </form>
        </div>
      </Main>
    </div>
  );
};

export default SignUp;
