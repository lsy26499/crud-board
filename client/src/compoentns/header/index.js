import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.scss';

const Header = () => {
  const history = useHistory();
  const { accessToken } = useSelector((state) => state.auth);

  const onClicSignOut = () => {
    //! 리덕스 & 토큰 삭제
    history.push('/');
  };

  return (
    <header className='header'>
      <nav className='header-nav'>
        <div className='home-button' onClick={() => history.push('/')}>
          홈
        </div>
        <ul className='auth-nav-section'>
          {!accessToken ? (
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
