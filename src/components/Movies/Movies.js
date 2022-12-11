import React from 'react';
import { useState, useEffect } from "react";
import { useLocalStorage } from '../LocalStorageTemplate/LocalStorageTemplate';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

function Movies({ allMovies, handleAddFav, handleSaveMovie, handleDeleteMovies, userMovies }) {
  const [keyword, setKeyword] = useLocalStorage('keyword', '');
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [successfulSearch, setSuccessfulSearch] = useState(true);
  const [findMovies, setFindMovies] = useState([]);
  const [checkbox, setCheckbox] = useState(false);

  function handleSubmitFormFilms(event) {
    event.preventDefault();
    keywordCheck();
  }

  function handleChangeInputKeyword(event) {
    setKeyword(event.target.value);
  }

  function handleCheckbox() {
    setCheckbox(!checkbox);
    setQuery(true);
    localStorage.setItem('checkboxState', JSON.stringify(!checkbox));
  }

  function keywordCheck() {
    if (keyword) {
      setQuery(true)
    } else {
      setErrorMessage('Введите ключевое слово');
    }
  }

  useEffect(() => {
    setCheckbox(JSON.parse(localStorage.getItem('checkboxState')));
  }, [checkbox])

  useEffect(() => {
    if (!checkbox && localStorage.getItem('foundUserMovies') !== null) {
      setFindMovies(JSON.parse(localStorage.getItem('foundUserMovies')));
    }
  }, [checkbox]);

  useEffect(() => {
    if (checkbox && localStorage.getItem('foundShortUserMovies') !== null) {
      setFindMovies(JSON.parse(localStorage.getItem('foundShortUserMovies')));
    }
  }, [checkbox]);

  useEffect(() => {
    if ((!keyword && query) || (!keyword && checkbox && query)) {
      setQuery(false)
      setEmpty(true)
    }
  }, [keyword, query, checkbox, empty]);

  useEffect(() => {
    if (query && !checkbox && keyword) {
      setErrorMessage('')
      const searchResults = allMovies.filter((movie) => {
        const titleMovie = movie.nameRU.toLowerCase();
        setEmpty(false);
        return titleMovie.includes(keyword.toLowerCase());
      });
      if (searchResults.length < 1) {
        localStorage.setItem('foundUserMovies', JSON.stringify(searchResults));
        setSuccessfulSearch(false);
      } else {
        setFindMovies(searchResults);
        localStorage.setItem('foundUserMovies', JSON.stringify(searchResults));
        setSuccessfulSearch(true);
      }
    }
    setTimeout(() => setQuery(false), 3000);
  }, [query, allMovies, keyword, setFindMovies, checkbox]);

  useEffect(() => {
    if (checkbox && query && keyword) {
      setErrorMessage('')
      const searchResults = allMovies.filter((movie) => {
        const titleMovie = movie.nameRU.toLowerCase();
        setEmpty(false);
        return titleMovie.includes(keyword.toLowerCase());
      });
      const shortSearchResult = searchResults.filter(movie => movie.duration <= 40);
      if (shortSearchResult.length < 1) {
        setSuccessfulSearch(false);
        localStorage.setItem('foundShortUserMovies', JSON.stringify(shortSearchResult));
      } else {
        localStorage.setItem('foundShortUserMovies', JSON.stringify(shortSearchResult));
        setFindMovies(shortSearchResult)
        setSuccessfulSearch(true);
      }
    }
    setTimeout(() => setQuery(false), 3000);
  }, [query, checkbox, allMovies, keyword, setFindMovies]);

  return (
    <>
      <SearchForm
        handleSubmit={handleSubmitFormFilms}
        handleChange={handleChangeInputKeyword}
        keyword={keyword}
        errorFormMessage={errorMessage}
        checkbox={checkbox}
        handleCheckbox={handleCheckbox}
      />
      {(query && (!checkbox || checkbox)) ? (
        <Preloader />
      ) : successfulSearch ? (
        <MoviesCardList
          movies={findMovies}
          savedMovies={userMovies}
          handleAddFav={handleAddFav}
          handleSaveMovie={handleSaveMovie}
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

export default Movies
