import { Router, Route, Switch } from 'react-router-dom';
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

const App = () => {
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
