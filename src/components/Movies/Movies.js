import React from 'react';
import { useState, useEffect } from "react";
import { useLocalStorage } from '../LocalStorageTemplate/LocalStorageTemplate';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

function Movies({ allMovies, handleAddFav, handleSaveMovie, handleDeleteMovies, userMovies}) {
  const [keyword, setKeyword] = useLocalStorage('keyword', '');
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [successfulSearch, setSuccessfulSearch] = useState(true);
  const [findMovies, setFindMovies] = useState([]);
  const [checkbox, setCheckbox] = useState(false);
  console.log("findMovies")
  console.log(findMovies)
  console.log(typeof (findMovies))
  console.log(keyword)
  console.log(empty)
  console.log(successfulSearch)

  useEffect(() => {
    console.log(checkbox + 'CHECKBOX')
    console.log('userMovies')
    console.log(userMovies)
    console.log(allMovies)
  })

  function handleSubmitFormFilms(event) {
    event.preventDefault();
    keywordCheck();
  }

  function handleChangeInputKeyword(event) {
    setKeyword(event.target.value);
  }

  function handleCheckbox() {
    setCheckbox(!checkbox)
    setQuery(true)
    localStorage.setItem('checkboxState', JSON.stringify(!checkbox));
    console.log(localStorage)
    console.log('checkbox ' + checkbox)
    console.log('РАБОТАЕТ СЛАЙДЕР')
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
    console.log('22222222222222222222222222222222')
  }, [checkbox])

  useEffect(() => {
    if (checkbox && localStorage.getItem('foundUserMovies') !== null) {
      setFindMovies(JSON.parse(localStorage.getItem('foundShortUserMovies')));
    }
    //localStorage.getItem('checkboxState', JSON.stringify(!checkbox));
    //console.log('ААААААААААААААААААААААААААААААААААААААААААААААААААААААААА')

  }, [checkbox])


  useEffect(() => {
    if (localStorage.getItem('foundUserMovies') !== null) {
      setFindMovies(JSON.parse(localStorage.getItem('foundUserMovies')));
      console.log('РАБОТАЕШЬ')

    }
  }, []);

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
        setSuccessfulSearch(false);
      } else {
        setFindMovies(searchResults);
        localStorage.setItem('foundUserMovies', JSON.stringify(searchResults));
        console.log(localStorage)
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
        console.log('ГДЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕ')
        return titleMovie.includes(keyword.toLowerCase());
      });
      const shortSearchResult = searchResults.filter(movie => movie.duration <= 40);
      if (shortSearchResult.length < 1) {
        setSuccessfulSearch(false);
        console.log(searchResults)
      } else {
        localStorage.setItem('foundShortUserMovies', JSON.stringify(shortSearchResult));
        setFindMovies(shortSearchResult)
        setSuccessfulSearch(true);
        console.log(searchResults)
        console.log(localStorage)
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
