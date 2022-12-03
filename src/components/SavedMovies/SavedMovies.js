import React from 'react';
import { useState, useEffect } from "react";
import { useLocalStorage } from '../LocalStorageTemplate/LocalStorageTemplate';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'
//import api from '../../utils/MainApi';
import '../Movies/Movies.css'

function SavedMovies({ handleAddFav, userMovies, handleDeleteMovies, user, currentUser }) {
  const [keyword, setKeyword] = useLocalStorage('keyword', '');
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [successfulSearch, setSuccessfulSearch] = useState(true);
  const [findMovies, setFindMovies] = useState([]);
  const [checkbox, setCheckbox] = useState(false);

  console.log(checkbox)
  console.log(userMovies);
  console.log(findMovies);
  console.log(localStorage)

  function handleCheckbox() {
    setCheckbox(!checkbox)
    setQuery(true)
    console.log(checkbox)
    console.log('Слайдер переключился')
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
      console.log('ПРИВЕТ');
      setEmpty(true)
    }
  }, [keyword]);

  useEffect(() => {
    setFindMovies(userMovies.filter((movie) => movie.owner === currentUser._id))
  }, [userMovies, currentUser])

  useEffect(() => {
    const savedUserMovies = userMovies.filter((movie) => movie.owner === currentUser._id);
    const newSearchResult = savedUserMovies.filter(movie => movie.duration <= 40);
    console.log(savedUserMovies)
    console.log('savedUserMovies')
    if (query) {
      const searchResults = savedUserMovies.filter((movie) => {
        const titleMovie = movie.nameRU.toLowerCase();
        setEmpty(false);
        return titleMovie.includes(keyword.toLowerCase());
      });

      if (searchResults.length < 1) {
        setSuccessfulSearch(false);
        console.log('Проверка')
      } else {
        setFindMovies(searchResults);
        localStorage.setItem('savedUserMovies', JSON.stringify(savedUserMovies));
        console.log('newSearchResult')
        console.log(newSearchResult)
        console.log(searchResults)
        console.log(localStorage);
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

      if (searchResults.length < 1) {
        setSuccessfulSearch(false);
      } else {
        const newSearchResult = searchResults.filter(movie => movie.duration <= 40);
        setFindMovies(newSearchResult)
        localStorage.setItem('foundSavedShortUserMovies', JSON.stringify(newSearchResult));

        setSuccessfulSearch(true);
        console.log('Покажи по 40')
        console.log(checkbox)
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

  //function checkbox(){
    //if(checkbox){
     // const newSearchResult = searchResults.filter(movie => movie.duration <= 40);
    //}
  //}

//const savedUserMovies = userMovies.filter((movie) => movie.owner === currentUser._id);
    //setFindMovies(savedUserMovies);
    //console.log(currentUser.data)
    //const savedUserMovies = userMovies.filter((movie) => movie.owner === currentUser._id);

//useEffect(() => {
  //console.log(keyword)
  //if (query) {
    //const searchResults = savedUserMovies.filter((movie) => {
    //  const titleMovie = movie.nameRU.toLowerCase();
      //setEmpty(false);
     // return titleMovie.includes(keyword.toLowerCase());
    //});

    //if (searchResults.length < 1) {
     // setSuccessfulSearch(false);
      //console.log('Проверка')
    //} else {
    // setFindMovies(searchResults);
      //console.log(searchResults)
      //console.log(localStorage);
      //setSuccessfulSearch(true);
   // }
  //}
  //setTimeout(() => setQuery(false), 3000);
//}, [query, userMovies, keyword, setFindMovies]);

//localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  //const savedUserMovies = userMovies.filter((movie) => movie.owner === currentUser._id);

  //useEffect(() => {
  //createSavedMassive();
  //setFindMovies(JSON.parse(localStorage.getItem('savedUserMovies')));
  //console.log(savedUserMovies)
  //}, [createSavedMassive, savedUserMovies]);

  //function createSavedMassive(savedUserMovies) {
  // localStorage.setItem('savedUserMovies', JSON.stringify(savedUserMovies));
  // }

  //useEffect(() => {
    //if(!checkbox){
    // const filter = (JSON.parse(localStorage.getItem('savedUserMovies')));
      //const mimi = filter.filter((movie) => movie.owner === currentUser._id);
      //const amo = mimi.filter(movie => movie.duration <= 40);
     //setFindMovies(amo)
    //}
    //}, [checkbox, currentUser])
