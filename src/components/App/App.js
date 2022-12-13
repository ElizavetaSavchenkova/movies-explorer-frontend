import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from '../LocalStorageTemplate/LocalStorageTemplate';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import PopupMenu from '../PopupMenu/PopupMenu';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import api from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import useCloseButtons from '../useCloseButtons/useCloseButtons';
import './App.css';

function App() {
  const location = useLocation();
  const history = useHistory();
  //const [movies, setMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [userMovies, setUserMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [allMovies, setAllMovies] = useLocalStorage('allMovies', []);
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [errorMovieMessage, setErrorMovieMessage] = useState('')
  const header = ['/', '/movies', '/saved-movies', '/profile'];
  const footer = ['/', '/movies', '/saved-movies'];
  const popup = ['/', '/movies', '/saved-movies', '/profile'];
  useCloseButtons(closeAllPopups, isInfoTooltipOpen);

  const REQUEST_ERROR = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

  function handleMenuClick() {
    setIsPopupMenuOpen(true);
  }

  function handleCloseMenu() {
    setIsPopupMenuOpen(false);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
  }

  function showAuthError(message) {
    setErrorText(message)
    setTimeout(() => {
      setErrorText('')
    }, 5000)
  }

  useEffect(() => {
    const userToken = localStorage.getItem('jwt');
    if (userToken) {
      auth.getInfoToken(userToken)
        .then((data) => {
          setCurrentUser(data);
          setLoggedIn(true);
        }).catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn, history]);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInformation()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  //Подгрузить все фильмы/ Подгрузить информацию о пользователе
  useEffect(() => {
    if (loggedIn) {
      moviesApi.getMovies([])
        .then((movies) => {
          setAllMovies(movies)

        })
        .catch((err) => {
          console.log(err);
          setErrorMovieMessage(REQUEST_ERROR)
        });
    }
  }, [loggedIn, setAllMovies]);


  ///Регистрация пользователя
  function handleRegister({ name, email, password }) {
    auth.registerUser({ name, email, password })
      .then(() => {
        handleLogin({ email, password })
        handleInfoTooltipOpen();
        setInfoMessage(true)
      }).catch((err) => {
        console.log(err);
        handleInfoTooltipOpen();
        setInfoMessage(false)
        if (err.includes(409)) {
          showAuthError('К сожалению, регистрация не удалась. Пользователь с указанным E-mail уже зарегистрирован.')
        } else if (err.includes(400)) {
          showAuthError('К сожалению, произошла ошибка при регистрации. Пожалуйста, повторите попытку снова.')
        } else {
          showAuthError('К сожалению, произошла ошибка на сервере. Пожалуйста, повторите попытку регистрации позднее.')
        }
      });
  }

  //Залогиниться
  function handleLogin({ email, password }) {
    auth.authorizeUser({ email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        history.push('/movies');
      }).catch((err) => {
        console.log(err);
        handleInfoTooltipOpen();
        setInfoMessage(false);
        if (err.includes(401)) {
          showAuthError('При попытке входа указан неверный логин/пароль. Пожалуйста, укажите корректные данные.')
        } else if (err.includes(400)) {
          showAuthError('К сожалению, произошла ошибка при попытке входа. Пожалуйста, повторите попытку снова.')
        } else {
          showAuthError('К сожалению, произошла ошибка на сервере. Пожалуйста, повторите попытку регистрации позднее.')
        }
      })
  }

  ///Обновить профиль (имя, мэйл)
  function handleUpdateUser({ name, email }) {
    api.editProfile({ name, email })
      .then(() => {
        const editedUserInfo = { ...currentUser };
        editedUserInfo.name = name;
        editedUserInfo.email = email;
        setCurrentUser({ ...editedUserInfo });
        handleInfoTooltipOpen();
        setInfoMessage(true)
      }).catch((err) => {
        console.log(err);
        handleInfoTooltipOpen();
        setInfoMessage(false)
      });
  }

  //Выход из профиля
  function exitProfile() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('keyword')
    localStorage.removeItem('foundUserMovies');
    localStorage.removeItem('foundShortUserMovies');
    localStorage.removeItem('checkboxState')
    history.push('/signin');
  }

  useEffect(() => {
    if (loggedIn) {
      api.getSavedMovies()
        .then((data) => {
          setUserMovies(data.reverse());
        })
        .catch((err) => {
          console.log(err);
        })
    };
  }, [loggedIn, setUserMovies, setLoggedIn]);


  function handleSaveMovie(movie) {
    api.saveMovie(movie)
      .then((addedMovie) => {
        setUserMovies([addedMovie, ...userMovies]);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function handleDeleteMovies(movieId) {
    api.deleteMovie(movieId)
      .then(() => {
        const moviesForDelete = userMovies.filter((i) => i._id !== movieId && i);
        setUserMovies(moviesForDelete);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {header.includes(location.pathname) ? (
          <Header loggedIn={loggedIn} onMenuClick={handleMenuClick} />
        ) : null}
        {popup.includes(location.pathname) ? (
          <PopupMenu isOpen={isPopupMenuOpen} onMenuClick={handleCloseMenu} />
        ) : null}
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/signup">
            <Register
              onRegister={handleRegister}
              errorText={errorText} />
          </Route>
          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              errorText={errorText} />
          </Route>
          <ProtectedRoute
            exact path='/profile'
            loggedIn={loggedIn}
            component={Profile}
            onEditProfile={handleUpdateUser}
            onSignOut={exitProfile}
          />
          <ProtectedRoute
            exact path='/movies'
            loggedIn={loggedIn}
            component={Movies}
            allMovies={allMovies}
            userMovies={userMovies}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovies={handleDeleteMovies}
            errorMovieMessage={errorMovieMessage}
          />
          <ProtectedRoute
            exact path='/saved-movies'
            loggedIn={loggedIn}
            component={SavedMovies}
            userMovies={userMovies}
            handleDeleteMovies={handleDeleteMovies}
            currentUser={currentUser}
          />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <InfoTooltip
          name={"info"}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          infoMessage={infoMessage}>
        </InfoTooltip>
        {footer.includes(location.pathname) ? <Footer /> : null}
      </div >
    </CurrentUserContext.Provider>
  );
}

export default App
