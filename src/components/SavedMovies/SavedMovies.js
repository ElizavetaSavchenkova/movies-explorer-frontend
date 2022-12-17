import React from 'react';
import { useState, useEffect } from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { SHORTMOVIES_DURATION, LENGTH_ARRAY } from '../../utils/const';
import '../Movies/Movies.css'

function SavedMovies({ handleAddFav, userMovies, handleDeleteMovies, user, currentUser }) {
  const [keyword, setKeyword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [successfulSearch, setSuccessfulSearch] = useState(true);
  const [findMovies, setFindMovies] = useState([]);
  const [checkbox, setCheckbox] = useState(false);

  function handleCheckbox() {
    if (checkbox) {
      setCheckbox(false)
    } else {
      setCheckbox(true)
    }
    setQuery(true);
  }

  function handleChangeInputKeyword(event) {
    setKeyword(event.target.value);
  }

  function handleSubmitFormFilms(event) {
    event.preventDefault();
    keywordCheck();
  }

  function keywordCheck() {
    if (keyword) {
      setQuery(true)
    } else {
      setErrorMessage('Введите ключевое слово');
    }
  }

  useEffect(() => {
    setErrorMessage('');
    if (keyword === '') {
      setEmpty(true)
    }
  }, [keyword]);

  useEffect(() => {
    setFindMovies(userMovies.filter((movie) => movie.owner === currentUser._id))
  }, [userMovies, currentUser]);

  useEffect(() => {
    const savedUserMovies = userMovies.filter((movie) => movie.owner === currentUser._id);
    if (query) {
      const searchResults = savedUserMovies.filter((movie) => {
        const titleMovie = movie.nameRU.toLowerCase();
        setEmpty(false);
        return titleMovie.includes(keyword.toLowerCase());
      });
      if (searchResults.length < LENGTH_ARRAY) {
        setSuccessfulSearch(false);
      } else {
        setFindMovies(searchResults);
        localStorage.setItem('savedUserMovies', JSON.stringify(savedUserMovies));
        setSuccessfulSearch(true);
      }
      setTimeout(() => setQuery(false), 3000);
    }
  }, [query, userMovies, keyword, setFindMovies, currentUser]);

  useEffect(() => {
    const savedUserMovies = userMovies.filter((movie) => movie.owner === currentUser._id)
    if (checkbox) {
      const searchResults = savedUserMovies.filter((movie) => {
        const titleMovie = movie.nameRU.toLowerCase();
        setEmpty(false);
        return titleMovie.includes(keyword.toLowerCase());
      });

      if (searchResults.length < LENGTH_ARRAY) {
        setSuccessfulSearch(false);
      } else {
        const newSearchResult = searchResults.filter(movie => movie.duration <= SHORTMOVIES_DURATION);
        setFindMovies(newSearchResult)
        localStorage.setItem('foundSavedShortUserMovies', JSON.stringify(newSearchResult));
        setSuccessfulSearch(true);
      }
    }
    setTimeout(() => setQuery(false), 3000);
  }, [query, checkbox, keyword, setFindMovies, currentUser, userMovies]);

  return (
    <>
      <SearchForm
        handleSubmit={handleSubmitFormFilms}
        handleChange={handleChangeInputKeyword}
        keyword={keyword}
        errorFormMessage={errorMessage}
        user={user}
        checkbox={checkbox}
        handleCheckbox={handleCheckbox}
      />
      {query ? (
        <Preloader />
      ) : successfulSearch ? (
        <MoviesCardList
          movies={findMovies}
          handleAddFav={handleAddFav}
          savedMovies={userMovies}
          handleDeleteMovies={handleDeleteMovies}
        />
      ) : empty ? (
        <p className='movies__empty'></p>
      ) : (
        <h3 className='movies__showerror'>Ничего не найдено</h3>
      )}
    </>
  );
}

export default SavedMovies;
