import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../modules/store';
import './index.scss';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const onClicSignOut = () => {
    dispatch(actions.signOut());
    history.push('/');
  };

  return (
    <header className='header'>
      <nav className='header-nav'>
        <div className='home-button' onClick={() => history.push('/')}>
          홈
        </div>
        <ul className='auth-nav-section'>
          {!isLoggedIn ? (
            <>
              <li className='nav-item' onClick={() => history.push('/sign-in')}>
                로그인
              </li>
              <li
                className='nav-item highlight'
                onClick={() => history.push('/sign-up')}
              >
                회원가입
              </li>
            </>
          ) : (
            <>
              <li className='nav-item' onClick={() => history.push('/my-page')}>
                마이페이지
              </li>
              <li className='nav-item highlight' onClick={onClicSignOut}>
                로그아웃
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
