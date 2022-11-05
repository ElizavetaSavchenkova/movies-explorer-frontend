import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Main from '../Main/Main'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import PopupMenu from '../PopupMenu/PopupMenu';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';

function App() {
  const location = useLocation();
  const footer = ['/', '/movies', '/saved-movies'];

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
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/profile">
          <Header loggedIn="true" onMenuClick={handleMenuClick} />
          <PopupMenu isOpen={isPopupMenuOpen} onMenuClick={handleCloseMenu} />
          <Profile />
        </Route>
        <Route path="/movies">
          <Header loggedIn="true" onMenuClick={handleMenuClick} />
          <PopupMenu isOpen={isPopupMenuOpen} onMenuClick={handleCloseMenu} />
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <Header loggedIn="true" onMenuClick={handleMenuClick} />
          <PopupMenu isOpen={isPopupMenuOpen} onMenuClick={handleCloseMenu} />
          <SavedMovies />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      {footer.includes(location.pathname) ? <Footer /> : null}
    </div >
  );
}

export default App;
