import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();

  return (
    <header>
      <div onClick={() => history.push('/')}>홈</div>
      <div>
        <div onClick={() => history.push('/sign-up')}>회원가입</div>
        <div onClick={() => history.push('/sign-in')}>로그인</div>
      </div>
    </header>
  );
};
export default Header;
