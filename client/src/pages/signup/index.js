import { useDispatch } from 'react-redux';
import { actions } from '../../modules/store';
import { Header, Main } from '../../compoentns';
import { useForm } from 'react-hook-form';
import { validateEmail, checkRequiredValueExist } from '../../utils';
import './index.scss';

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();

  const [requiredError, emailError] = [
    checkRequiredValueExist(errors),
    errors?.email?.type === 'validate',
  ];

  const onSubmit = (data) => {
    const { userId, email, password, secondPassword } = data;
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
          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            {requiredError && '모든 항목을 작성해주세요'}
            <div className='form-item'>
              <label htmlFor='userId'>아이디</label>
              <input
                placeholder='아이디'
                {...register('userId', { required: true })}
              ></input>
            </div>
            <div className='form-item'>
              <label htmlFor='email'>이메일</label>
              <input
                placeholder='이메일'
                {...register('email', {
                  required: true,
                  validate: validateEmail,
                })}
              ></input>
            </div>
            {emailError && '유효하지 않은 이메일'}
            <div className='form-item'>
              <label htmlFor='password'>비밀번호</label>
              <input
                placeholder='비밀번호'
                type='password'
                {...register('password', { required: true })}
              ></input>
            </div>
            <div className='form-item'>
              <label htmlFor='secondPassword'>비밀번호 확인</label>
              <input
                placeholder='비밀번호 확인'
                type='password'
                {...register('secondPassword', { required: true })}
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
