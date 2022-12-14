import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorageTemplate/useLocalStorageTemplate';
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
import InfoTooltipMovie from '../InfoTooltipMovie/InfoTooltipMovie';
import InfoTooltipMovieDel from '../InfoTooltipMovieDel/InfoTooltioMovieDel';
import InfoTooltipProfile from '../InfoTooltipProfile/InfoTooltipProfile';
import useCloseButtons from '../../hooks/useCloseButtons/useCloseButtons';
import './App.css';

import {
  TAKEN_EMAIL_ERROR,
  REQUEST_ERROR,
  DATA_NEWUSER_ERROR,
  SERVER_MESSAGE_ERROR,
  AUTH_LOGIN_ERROR,
  AUTH_ERROR,
  SUCCSESS_LOG_INFO,
  INFO_ERROR,
  SUCCSESS_SAVE_MOVIE,
  SUCCSESS_DELETE_MOVIE,
  SUCCSESS_UPDATE_PROFILE
}
  from '../../utils/const';

function App() {
  const location = useLocation();
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [userMovies, setUserMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [allMovies, setAllMovies] = useLocalStorage('allMovies', []);
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isMovieInfoTooltipOpen, setIsMovieInfoTooltipOpen] = useState(false);
  const [isMovieDelTooltipOpen, setIsMovieDelTooltipOpen] = useState(false);
  const [isProfileTooltipOpen, setIsProfileToolTipOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [errorMovieMessage, setErrorMovieMessage] = useState('')
  const header = ['/', '/movies', '/saved-movies', '/profile'];
  const footer = ['/', '/movies', '/saved-movies'];
  const popup = ['/', '/movies', '/saved-movies', '/profile'];
  useCloseButtons(closeAllPopups, isInfoTooltipOpen);

  function handleMenuClick() {
    setIsPopupMenuOpen(true);
  }

  function handleCloseMenu() {
    setIsPopupMenuOpen(false);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function handleMovieInfoTooltipOpen() {
    setIsMovieInfoTooltipOpen(true)
  }

  function handleMovieDelInfoTooltipOpen() {
    setIsMovieDelTooltipOpen(true);
  }

  function handleProfileTooltipOpen() {
    setIsProfileToolTipOpen(true)
  }

  function closeTimeOut() {
    setTimeout(() => {
      setIsMovieInfoTooltipOpen(false);
      setIsMovieDelTooltipOpen(false);
      setIsProfileToolTipOpen(false);
    }, 2000)
  }

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setIsMovieInfoTooltipOpen(false);
    setIsMovieDelTooltipOpen(false);
    setIsProfileToolTipOpen(false);
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
          showAuthError(TAKEN_EMAIL_ERROR)
        } else if (err.includes(400)) {
          showAuthError(DATA_NEWUSER_ERROR)
        } else {
          showAuthError(SERVER_MESSAGE_ERROR)
        }
      });
  }

  function handleLogin({ email, password }) {
    auth.authorizeUser({ email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        history.push('/movies');
        handleInfoTooltipOpen();
        setInfoMessage(true)
      }).catch((err) => {
        console.log(err);
        handleInfoTooltipOpen();
        setInfoMessage(false);
        if (err.includes(401)) {
          showAuthError(AUTH_LOGIN_ERROR)
        } else if (err.includes(400)) {
          showAuthError(AUTH_ERROR)
        } else {
          showAuthError(SERVER_MESSAGE_ERROR)
        }
      })
  }

  function handleUpdateUser({ name, email }) {
    api.editProfile({ name, email })
      .then(() => {
        const editedUserInfo = { ...currentUser };
        editedUserInfo.name = name;
        editedUserInfo.email = email;
        setCurrentUser({ ...editedUserInfo });
        handleProfileTooltipOpen();
        setInfoMessage(true);
        closeTimeOut();
      }).catch((err) => {
        console.log(err);
        handleProfileTooltipOpen();
        setInfoMessage(false);
        closeTimeOut();
      });
  }

  function exitProfile() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('keyword')
    localStorage.removeItem('foundUserMovies');
    localStorage.removeItem('foundShortUserMovies');
    localStorage.removeItem('checkboxState');
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
        handleMovieInfoTooltipOpen();
        setInfoMessage(true);
        closeTimeOut();
      })
      .catch((err) => {
        console.log(err);
        handleMovieInfoTooltipOpen();
        setInfoMessage(true);
        closeTimeOut();
      })
  };

  function handleDeleteMovies(movieId) {
    api.deleteMovie(movieId)
      .then(() => {
        const moviesForDelete = userMovies.filter((i) => i._id !== movieId && i);
        setUserMovies(moviesForDelete);
        handleMovieDelInfoTooltipOpen();
        setInfoMessage(true);
        closeTimeOut();
      })
      .catch((err) => {
        console.log(err);
        handleMovieDelInfoTooltipOpen();
        setInfoMessage(false);
        closeTimeOut();
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
          infoMessage={infoMessage ? SUCCSESS_LOG_INFO : INFO_ERROR}>
        </InfoTooltip>
        <InfoTooltipMovie
          name={"movie"}
          isOpen={isMovieInfoTooltipOpen}
          onClose={closeAllPopups}
          infoMessage={infoMessage ? SUCCSESS_SAVE_MOVIE : INFO_ERROR}
        />
        <InfoTooltipMovieDel
          name={"movie-delete"}
          isOpen={isMovieDelTooltipOpen}
          onClose={closeAllPopups}
          infoMessage={infoMessage ? SUCCSESS_DELETE_MOVIE : INFO_ERROR}
        />
        <InfoTooltipProfile
          name={"profile"}
          isOpen={isProfileTooltipOpen}
          onClose={closeAllPopups}
          infoMessage={infoMessage ? SUCCSESS_UPDATE_PROFILE : INFO_ERROR}
        />
        {footer.includes(location.pathname) ? <Footer /> : null}
      </div >
    </CurrentUserContext.Provider>
  );
}

export default App

