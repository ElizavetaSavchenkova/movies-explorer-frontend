import { Switch, Route } from 'react-router-dom';

import Main from '../Main/Main'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import './App.css';

function App() {

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header />
          <Main />
          <Footer />
        </Route>

        <Route path="/signup">
          <Register />
        </Route>

        <Route path="/signin">
          <Login />
        </Route>

        <Route exact path='/profile'>
          <Profile />
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>

      </Switch>
    </div >
  );
}

export default App;

//lang
