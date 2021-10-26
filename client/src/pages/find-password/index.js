import { useDispatch } from 'react-redux';
import { actions } from '../../modules/store';
import { Header, Main } from '../../compoentns';
import { useForm } from 'react-hook-form';
import { validateEmail, checkRequiredValueExist } from '../../utils';
import './index.scss';

const FindPassword = () => {
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
    dispatch(actions.checkUser({ ...data }));
  };

  return (
    <div>
      <Header />
      <Main>
        <main className='find-password'>
          <h1 className='title'>비밀번호 찾기</h1>
          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            {requiredError && '모든 항목을 작성해주세요'}
            <div className='form-item'>
              <label htmlFor='userId'>아이디</label>
              <input
                placeholder='아이디'
                {...register('userId', {
                  required: true,
                })}
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
            <button type='submit'>확인</button>
          </form>
        </main>
      </Main>
    </div>
  );
};

export default FindPassword;
