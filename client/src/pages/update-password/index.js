import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../modules/store';
import { Header, Main } from '../../compoentns';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { checkRequiredValueExist } from '../../utils';
import './index.scss';

const UpdatePassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { foundData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const requiredError = checkRequiredValueExist(errors);

  const onSubmit = (data) => {
    const { newPassword, newPasswordCheck } = data;
    if (newPassword !== newPasswordCheck) {
      alert('패스워드가 다릅니다');
      return;
    }
    dispatch(actions.updatePassword({ id: foundData.id, newPassword }));
  };

  useEffect(() => {
    if (!foundData || !foundData.id) {
      history.push('/find-password');
    }
    return () => {
      dispatch(actions.removeFoundUserData());
    };
  }, []);

  return (
    <div>
      <Header />
      <Main>
        <main className='update-password'>
          <h1 className='title'>비밀번호 재설정</h1>
          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            {requiredError && '모든 항목을 작성해주세요'}
            <div className='form-item'>
              <label htmlFor='newPassword'>새 비밀번호</label>
              <input
                placeholder='새 비밀번호'
                type='password'
                {...register('newPassword', { required: true })}
              ></input>
            </div>
            <div className='form-item'>
              <label htmlFor='newPasswordCheck'>새 비밀번호 확인</label>
              <input
                placeholder='새 비밀번호 확인'
                type='password'
                {...register('newPasswordCheck', { required: true })}
              ></input>
            </div>
            <button type='submit'>확인</button>
          </form>
        </main>
      </Main>
    </div>
  );
};

export default UpdatePassword;
