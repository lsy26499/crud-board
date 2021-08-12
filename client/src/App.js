import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, SignIn, SignUp } from './pages';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/sign-up' component={SignUp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
