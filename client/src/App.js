import { Router, Route, Switch } from 'react-router-dom';
import { history } from './modules/store';
import { Home, SignIn, SignUp } from './pages';
import './index.scss';

const App = () => {
  return (
    <div className='App'>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/sign-up' component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
