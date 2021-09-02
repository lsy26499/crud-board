import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../modules/store';
import './index.scss';

const PostHeader = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const history = useHistory();

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
          <li className='nav-item' onClick={onSubmit}>
            저장
          </li>
          <li className='nav-item highlight' onClick={onClicSignOut}>
            로그아웃
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default PostHeader;
