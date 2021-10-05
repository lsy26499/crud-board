import { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions, history } from './modules/store';
import {
  Home,
  SignIn,
  SignUp,
  FindUserId,
  FindPassword,
  UpdatePassword,
  Post,
  CreatePost,
  UpdatePost,
  KakaoApproval,
  FailPayment,
  CancelPayment,
} from './pages';
import './index.scss';
import { axios } from './utils';

const App = () => {
  const { accessToken, tokenType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const authorization = `${tokenType} ${accessToken}`;
    axios.defaults.headers['AccessToken'] = accessToken;
    axios.defaults.headers['Authorization'] = authorization;
    dispatch(actions.removeFoundUserData());
  }, []);

  return (
    <div className='App'>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/find-id' component={FindUserId} />
          <Route path='/find-password' component={FindPassword} />
          <Route path='/update-password' component={UpdatePassword} />
          <Route path='/post/:id' component={Post} />
          <Route path='/create-post' component={CreatePost} />
          <Route path='/update-post/:id' component={UpdatePost} />
          <Route path='/payment/kakao/approval' component={KakaoApproval} />
          <Route path='/payment/kakao/cancel' component={CancelPayment} />
          <Route path='/payment/kakao/fail' component={FailPayment} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
