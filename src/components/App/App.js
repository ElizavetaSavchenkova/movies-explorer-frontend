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

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


////

function App() {
  const location = useLocation();
  const header = ['/', '/movies', '/saved-movies', '/profile'];
  const footer = ['/', '/movies', '/saved-movies'];
  const popup = ['/', '/movies', '/saved-movies', '/profile']


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
  //level3
 //Подгрузить все фильмы/ Подгрузить информацию о пользователе
  useEffect(() => {
    Promise.all([api.getUserInformation(), moviesApi.getMovies([])])
      .then(([data, movies]) => {
        setCurrentUser(data);
        setMovies({movies})
        console.log(movies)
        console.log(data)
        console.log(data.email)
        console.log('Currentuser работает')
      })
      .catch((err) => {
        console.log(err);
        console.log('currentUser не работает ')
      });
  }, [loggedIn]);


  //Загрузка токена на странице
  useEffect(() => {
    const userToken = localStorage.getItem('jwt');
    if (userToken) {
      auth.getInfoToken(userToken)
        .then(() => {
          //setLoggedIn(true);
          //setEmail(data.data.email);
          console.log(userToken);
          console.log(currentUser.name);
          console.log(currentUser.email);
          console.log('Токен подкрепился')
        }).catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn, history]);


  ///Регистрация пользователя
  function handleRegister({ name, email, password }) {
    console.log(name, email, password)
    console.log('Начинается регистрация в handleregister app')
    auth.registerUser({ name, email, password })
      .then(() => {
        handleLogin({ email, password })
        console.log('Профиль')
        console.log({ email, password })
      }).catch((err) => {
        console.log(err);
        console.log('Ошибка в handleRegister (App.js)')
      });
  }


  //Залогиниться
  function handleLogin({ email, password }) {
    auth.authorizeUser({ email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        //setLoggedIn(true);
console.log('Залогинился');
        history.push('/profile');
      }).catch((err) => {
        console.log(err);

      })
  }

  ///Обновить профиль (имя, мэйл)
  function handleUpdateUser({ name, email }) {
    api.editProfile(name, email)
      .then(() => {
        const editedUserInfo = { ...currentUser };
        editedUserInfo.name = name;
        editedUserInfo.email = email;
        setCurrentUser({ ...editedUserInfo });
      }).catch((err) => {
        console.log(err);
      });
  }

  //выход из профиля
  function exitProfile() {
    localStorage.removeItem('jwt');
    //setLoggedIn(false);
    //setEmail('');
    history.push('/signin');
    console.log('Выход выполнен')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>

          <Route exact path="/">
            <Header  />
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

            <Profile onUpdateUser={handleUpdateUser}
            onEditProfile={handleUpdateUser}
            onSignOut={exitProfile}/>
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
