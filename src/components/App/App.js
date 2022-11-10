import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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


////level 3
import api from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import moviesApi from '../../utils/MoviesApi';


////

function App() {
  const location = useLocation();
  const footer = ['/', '/movies', '/saved-movies'];
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);

  ///level3
  const [movies, setMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const [email, setEmail] = ('');

  ///level2
  function handleMenuClick() {
    setIsPopupMenuOpen(true);
  }

  function handleCloseMenu() {
    setIsPopupMenuOpen(false);
  }
  ///level3
  ///ПОЛУЧИТЬ ИНФОРМАЦИЮ В ПРОФИЛЬ О КЛИЕНТЕ (пока не работает)
  useEffect(() => {
    Promise.all([api.getUserInformation()])
      .then(([data]) => {
        setCurrentUser(data.data)
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
        console.log('ОШИБКА в промисе app.js')
      });
  }, [loggedIn]);

  //ПОЛУЧИТЬ ВСЕ ФИЛЬМЫ (НЕ НУЖНО, НО ПРОВЕРЯЮ, ЧТО РАБОТАЕТ)(работает)

  useEffect(() => {
    Promise.all([moviesApi.getMovies([])])
      .then(([movies]) => {
        setMovies({ movies });
        console.log(movies);
      })
      .catch((err) => {
        console.log(err);
        console.log(movies);
        console.log('ОШИБКА в промисе app.js')
      });
  }, [loggedIn]);

  ///////РЕГИСТРАЦИЯ
  function handleRegister(name, email, password) {
    console.log(name, email, password)
    console.log('Начинает handleRegister в app.js?')
    auth.registerUser({name, email, password})
      .then((res) => {
        if (res) {
          console.log('Начинает register в app!!!!!!!!')
          history.push('/signin');
          console.log('начинает')
        }
      }).catch((err) => {
        console.log(err);
        console.log('Ошибка в handleRegister (App.js')
      });
  }

  ////ЛОГИН
  function handleLogin({ email, password }) {
    console.log('РАБОТАЕШЬ???')
    auth.authorizeUser({ email, password })
      .then((res) => {
        console.log('Начинает login в app')
        console.log(res.token);
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        history.push('/');
      }).catch((err) => {
        console.log(err);
        console.log('не работает handlelogin в app.js')
      })
  }

  /////////ТОКЕН
  useEffect(() => {
    const userToken = localStorage.getItem('jwt');
    if (userToken) {
      auth.getInfoToken(userToken)
        .then((data) => {
          console.log('ТОКЕН РАБОТАЕТ')
          setLoggedIn(true);
          setEmail(data.data.email);
          history.push('/');
        }).catch((err) => {
          console.log(err);
          console.log('ТОКЕН НЕ РАБОТАЕТ')
        });
    }
  }, [loggedIn, history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header />
            <Main />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
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
    </CurrentUserContext.Provider>

  );
}

export default App;
//loggedIn на фронт временно через "true"
