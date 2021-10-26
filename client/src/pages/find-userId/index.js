import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../modules/store';
import { Header, Main } from '../../compoentns';
import { useForm } from 'react-hook-form';
import { validateEmail, checkRequiredValueExist } from '../../utils';
import './index.scss';

const FindUserId = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { foundData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [requiredError, emailError] = [
    checkRequiredValueExist(errors),
    errors?.email?.type === 'validate',
  ];

  const onSubmit = (data) => {
    dispatch(actions.findUserId({ ...data }));
  };

  return (
    <div>
      <Header />
      <Main>
        <main className='find-id'>
          <h1 className='title'>아이디 찾기</h1>
          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            {requiredError && '모든 항목을 작성해주세요'}
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
          {foundData && <div>{`아이디: ${foundData}`}</div>}
        </main>
      </Main>
    </div>
  );
};

export default FindUserId;
