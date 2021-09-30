import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../modules/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { pagination } = useSelector((state) => state.board);
  const { pageSize } = pagination;
  const [inputValue, setInputValue] = useState('');

  const onChangeValue = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const onClickHome = () => {
    dispatch(actions.getPostList({ page: 0, pageSize, search: null }));
    history.push('/');
  };

  const onSearch = () => {
    dispatch(actions.getPostList({ page: 0, pageSize, search: inputValue }));
  };

  const onClicSignOut = () => {
    dispatch(actions.signOut());
    history.push('/');
  };

  useEffect(() => {
    if (history.location.pathname !== '/update-password') {
      dispatch(actions.removeFoundUserData());
    }
  }, [history.location.pathname]);

  return (
    <header className='header'>
      <nav className='header-nav'>
        <div className='home-button' onClick={onClickHome}>
          홈
        </div>
        <div className='header-search'>
          <input
            className='search-input'
            value={inputValue}
            onChange={onChangeValue}
          />
          <div className='search-button' onClick={onSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
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
              <li
                className='nav-item'
                onClick={() => history.push('/create-post')}
              >
                글쓰기
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
