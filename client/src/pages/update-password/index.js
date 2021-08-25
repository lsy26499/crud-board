import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../modules/store';
import { Header } from '../../compoentns';
import { useHistory } from 'react-router-dom';
import './index.scss';

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const { foundData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    if (newPassword === '' || newPasswordCheck === '') {
      alert('패스워드를 입력해주세요');
      return;
    }
    if (newPassword !== newPasswordCheck) {
      alert('패스워드가 다릅니다');
      return;
    }
    dispatch(actions.updatePassword({ id: foundData.id, newPassword }));
  };

  const onChangeNewPassword = (e) => {
    const value = e.target.value;
    setNewPassword(value);
  };

  const onChangeNewPasswordCheck = (e) => {
    const value = e.target.value;
    setNewPasswordCheck(value);
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
      <main className='update-password'>
        <h1 className='title'>비밀번호 재설정</h1>
        <section className='form-section'>
          <form className='update-password-form' onSubmit={onSubmit}>
            <input
              placeholder='새 비밀번호'
              type='password'
              name='newPassword'
              value={newPassword}
              onChange={onChangeNewPassword}
            ></input>
            <input
              placeholder='새 비밀번호 확인'
              type='password'
              name='newPasswordCheck'
              value={newPasswordCheck}
              onChange={onChangeNewPasswordCheck}
            ></input>
            <button type='submit'>확인</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default UpdatePassword;
