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
import { useLocalStorage } from '../LocalStorageTemplate/LocalStorageTemplate';
////
function App() {
  const location = useLocation();
  const header = ['/', '/movies', '/saved-movies', '/profile'];
  const footer = ['/', '/movies', '/saved-movies'];
  const popup = ['/', '/movies', '/saved-movies', '/profile'];
  const history = useHistory();
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userMovies, setUserMovies] = useState([]);
  const [user, setUser] = useState('')
  const [allMovies, setAllMovies] = useLocalStorage('allMovies', []);
  console.log(allMovies)

  ///level 3
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState('')
  const [email, setEmail] = ('');
  const [name, setName] = ('');
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [checked, setChecked] = useState(false);


  Array.from(userMovies)
  var a = Array.isArray(allMovies)
  console.log(a)
  const abjArr = Object.entries(userMovies);
  abjArr.forEach(([key, value]) => {
    console.table(key, value);
  });
  var b = Array.isArray(userMovies)
 console.log(b)
  console.log(userMovies)

  ///level 2
  function handleMenuClick() {
    setIsPopupMenuOpen(true);
  }

  function handleCloseMenu() {
    setIsPopupMenuOpen(false);
  }

  //level 3
  useEffect(() => {
    const userToken = localStorage.getItem('jwt');
    if (userToken) {
      auth.getInfoToken(userToken)
        .then((data) => {
          console.log(data)
          setCurrentUser(data);
          setLoggedIn(true);
          console.log(loggedIn);
          console.log(currentUser)
          console.log('Токен подкрепился')
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
        console.log(localStorage)
        console.log(movies)
        console.log(data)
        const user = data._id;
        console.log(user)
        setUser(user)
        console.log(currentUser.email)
        console.log('CURRENTUSER Работает')
        console.log('getuserinfo ' + data)
        console.log('getuserinfo ' + data.email)
        console.log(loggedIn)
      })
      .catch((err) => {
        console.log(err);
        console.log('currentUser не работал ')
      });
  }, [loggedIn]);

  ///Регистрация пользователя
  function handleRegister({ name, email, password }) {
    console.log(name, email, password)
    console.log('Начинается регистрация в handleregister app')
    auth.registerUser({ name, email, password })
      .then(() => {
        handleLogin({
          email,
          password
        })
        console.log('Профиль')
        console.log({ email, password })
        console.log(currentUser)
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
        //setCurrentUser(res.data)
        setCurrentUser({ name, email })
        setLoggedIn(true);
        history.push('/profile');
        console.log('Залогинился ' + email)
        console.log(res.token);
        //localStorage.removeItem('savedUserMovies') //закоммитила
        console.log(localStorage)

        // userMovies.length = 0;
        console.log(userMovies);
      }).catch((err) => {
        console.log(err);
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
        console.log('Информация встала');
      }).catch((err) => {
        console.log(err);
        console.log('PATCH не работает')
      });
  }

  //Выход из профиля
  function exitProfile() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('keyword')
    localStorage.removeItem('foundUserMovies');
    localStorage.removeItem('foundShortUserMovies');
    localStorage.removeItem('checkboxState')
    setLoggedIn(false);
    //setEmail('');
    history.push('/signin');
    console.log('Выход выполнен')
  }

  //useEffect(() => {
  // /userMovies.filter((movie) => movie.owner === currentUser._id
  // );
  // })

  useEffect(() => {
    if (loggedIn && allMovies.length < 1) {
      moviesApi
        .getMovies()
        .then((data) => {
          setAllMovies(data);
        })
        .catch((err) => {
          if (err) {
            setMessage('error');
          }
        });
    }
  }, [loggedIn, allMovies, setAllMovies, setLoggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.getSavedMovies()
        .then((data) => {
          setUserMovies(data.reverse());
          // let keys = Object.keys(userMovies);
          // console.log(keys);
          //let values = Object.values(userMovies);
          //console.log(values)
          console.log('ПОКАЖИ ДАННЫЕ');
          console.log(data);
        })
        .catch((err) => {
          setMessage(err)
        })
    };
  }, [loggedIn, setUserMovies, setLoggedIn]);


  function handleSaveMovie(movie) {
    console.log('ПРИВЕТ')
    console.log(movie)
    console.log(typeof (movie))
    api.saveMovie(movie)
      .then((newMovie) => {
        setUserMovies([newMovie, ...userMovies]);
      })
      .catch((err) => {
        setMessage('err')
        console.log('eeeeeeerorrrrrrrrrrrr')
      })
  };


  function handleDeleteMovies(movieId) {
    //console.log(movie)
    //const movieId = movie._id;
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
            <Register onRegister={handleRegister} />
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
        {footer.includes(location.pathname) ? <Footer /> : null}
      </div >
    </CurrentUserContext.Provider>

  );
}

export default App
