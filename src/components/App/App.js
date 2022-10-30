import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';

import Main from '../Main/Main'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Navigation from '../Navigation/Navigation';
import PopupMenu from '../PopupMenu/PopupMenu';

import './App.css';


function App() {

  const [loggedIn, setLoggedIn] = useState(true);
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);

  function handleMenuClick() {
    setIsPopupMenuOpen(true);
  }

  function handleCloseMenu() {
    setIsPopupMenuOpen(false);
  }

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

        <Route exact path="/profile">
          <Header loggedIn={loggedIn} onMenuClick={handleMenuClick} />
          <PopupMenu isOpen={isPopupMenuOpen} onMenuClick={handleCloseMenu}/>

          <Profile />

        </Route>

        <Route path='/Nav'>
          <Navigation />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>




      </Switch>



    </div >
  );
}

export default App;

//lang
