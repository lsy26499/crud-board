import { Router, Route, Switch } from 'react-router-dom';
import { history } from './modules/store';
import { Home, SignIn, SignUp, FindUserId, FindPassword } from './pages';
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
        </Switch>
      </Router>
    </div>
  );
};

export default App;
