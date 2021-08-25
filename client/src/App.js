import { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { history } from './modules/store';
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
} from './pages';
import './index.scss';
import { axios } from './utils';

const App = () => {
  const { accessToken, tokenType } = useSelector((state) => state.auth);
  useEffect(() => {
    const authorization = `${tokenType} ${accessToken}`;
    axios.defaults.headers['AccessToken'] = accessToken;
    axios.defaults.headers['Authorization'] = authorization;
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
        </Switch>
      </Router>
    </div>
  );
};

export default App;
