import { useHistory } from 'react-router-dom';
import { Header, Main } from '../../compoentns';
import { actions } from '../../modules/store';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { checkRequiredValueExist } from '../../utils';
import './index.scss';

const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const requiredError = checkRequiredValueExist(errors);

  const onSubmit = (data) => {
    dispatch(actions.signIn({ ...data }));
  };

  return (
    <div>
      <Header />
      <Main>
        <div className='login-container'>
          <h1 className='title'>로그인</h1>
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
              <label htmlFor='userId'>비밀번호</label>
              <input
                placeholder='비밀번호'
                type='password'
                {...register('password', { required: true })}
              ></input>
            </div>
            {}
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
