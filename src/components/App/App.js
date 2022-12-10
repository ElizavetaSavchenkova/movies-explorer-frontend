import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from '../LocalStorageTemplate/LocalStorageTemplate';
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
import api from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import './App.css';

import useCloseButtons from '../useCloseButtons/useCloseButtons';

function App() {
  const location = useLocation();
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const [userMovies, setUserMovies] = useState([]);
  const [allMovies, setAllMovies] = useLocalStorage('allMovies', []);
  const [user, setUser] = useState('')
  const header = ['/', '/movies', '/saved-movies', '/profile'];
  const footer = ['/', '/movies', '/saved-movies'];
  const popup = ['/', '/movies', '/saved-movies', '/profile'];

  const [errorText, setErrorText] = useState('')
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState(false);

  useCloseButtons(closeAllPopups, isInfoTooltipOpen);

  ///level 3
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState('')


  useEffect(() => {
    function handleClickOverlay(e) {
      if (e.target.classList.contains("popup-menu")) {
        if (isPopupMenuOpen) {
          setIsPopupMenuOpen(false);
        }
      }
    }

    function handleClickButton() {
      if (isPopupMenuOpen) {
        setIsPopupMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOverlay);
    document.addEventListener("keyup", handleClickButton);

    return () => {
      document.removeEventListener("mousedown", handleClickOverlay);
      document.removeEventListener("keyup", handleClickButton);
    };
  }, [setIsPopupMenuOpen, isPopupMenuOpen]);

  ///level 2
  function handleMenuClick() {
    setIsPopupMenuOpen(true);
  }

  function handleCloseMenu() {
    setIsPopupMenuOpen(false);
  }


  function showAuthError(message) {
    setErrorText(message)
    setTimeout(() => {
      setErrorText('')
    }, 5000)
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    // setIsEditAvatarPopupOpen(false)
    // setIsEditProfilePopupOpen(false)
    //setIsAddPlacePopupOpen(false)
    setIsInfoTooltipOpen(false);


  }

  ////////////////////////////////////////////////////////////////////////////////////////level 3
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

  //Подгрузить все фильмы/ Подгрузить информацию о пользователе
  useEffect(() => {
    Promise.all([api.getUserInformation(), moviesApi.getMovies([])])
      .then(([data, movies]) => {
        setCurrentUser(data);
        setMovies({ movies })
        //setLoggedIn(true);
        //localStorage.setItem('apiBeatFilms', JSON.stringify({ movies }));
        const user = data._id;
        setUser(user)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);
  ////////////////////////////////////////////////////////////////////////////

  ///Регистрация пользователя
  function handleRegister({ name, email, password }) {
    auth.registerUser({ name, email, password })
      .then(() => {
        handleLogin({ email, password })
        handleInfoTooltipOpen();
        setInfoMessage(true)
        //setSuccessfulMessage(true)
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
        //setCurrentUser(res.data)
        //setCurrentUser({ res  })
        setLoggedIn(true);
        history.push('/movies');
        handleInfoTooltipOpen();
        setInfoMessage(true)
      }).catch((err) => {
        console.log(err);
        handleInfoTooltipOpen();
        setInfoMessage(false)
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
    if (loggedIn && allMovies.length < 1) {
      moviesApi.getMovies()
        .then((data) => {
          setAllMovies(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn, allMovies, setAllMovies, setLoggedIn]);

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
            <Login onLogin={handleLogin} />
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
