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

export default Movies;

//НЕ забудь про кнопку. добавить, чтобы было больше фильмовы



  //useEffect(() => {
  //setErrorMessage('');
  // }, []);


//function test() {
  //if (localStorage.getItem('foundShortUserMovies') === null) {
    //setSuccessfulSearch(false)
    //console.log('ЩОРТ МУВИС')
  //}
//}

  //function raw(){
  // setChecked(true);
  //if (checked){
  // console.log('ПОКАЖИ КАРТОЧКИ')
  // let filteredShorts = allMovies.filter((movie) => {
  // return (movie.duration <= shortMoviesDuration)
  //})
  //return filteredShorts
  //}
  //}

  //function filterShorts(movies) {
  // let filteredShorts = movies.filter((movie) => {
  //  return (movie.duration <= shortMoviesDuration)
  // })
  // return filteredShorts
  //}

  // useEffect(() => {
  //setFindMovies(allMovies);
  // }, [allMovies]);

  //const foundUserMovies = allMovies.filter((movie) => movie.owner === currentUser._id);


  //function createSavedMassive() {

    //}
  //useEffect(() => {
  //checkbox ? setFindMovies(allMovies.filter(movie => movie.duration <= 40)) : setFindMovies(allMovies)
  //console.log(checkbox)
  //console.log('Будет искать меньше 40 мин.')
  //}, [checkbox, allMovies])


    //const [shortMovies, setShortMovies] = []

  //function test(){

  //setShortMovies(show)

  //const show2 = (JSON.parse(localStorage.getItem('foundShortUserMovies')));
  //(JSON.parse(localStorage.getItem('foundUserMovies')));
  //}

  //useEffect(() => {
  //console.log('checkbox ' + checkbox);
  //console.log('query ' + query)
  //setFindMovies()
  //})

    //const show = (JSON.parse(localStorage.getItem('foundUserMovies')));
  //console.log(show)

  //useEffect(() => {
  //show
  // if (!checkbox) {
  //  setFindMovies(show)
  //console.log(show)
  //} else {
  //setFindMovies(show2);
  // }
  //}, []
  //)


  //useEffect(() => {
  //createSavedMassive();
  //setFindMovies(JSON.parse(localStorage.getItem('searchResults')));
  //console.log(searchResults)
  ///}, []);



    /// показывает массив найденных фильмов (когда искали через поисковик)
  //useEffect(() => {
  //if(keyword !== ''){
  //setFindMovies(JSON.parse(localStorage.getItem('foundUserMovies')));
  //}
  //},  [keyword]);

  //useEffect(()=> {
  //setKeyword('HI')
  //})

 // useEffect(() => {
   // localStorage.setItem('foundUserMovies', JSON.stringify([]));
    //console.log(localStorage)
    //setFindMovies(JSON.parse(localStorage.getItem('foundUserMovies')));
//}, []);


  //useEffect(() => {
  //if (query && checkbox) {
  //const newSearchResult = allMovies.filter(movie => movie.duration <= 40);
  //localStorage.setItem('foundShortUserMovies', JSON.stringify(newSearchResult));
  //setFindMovies(newSearchResult)
  //setSuccessfulSearch(true);
  //}
  // }, [query, checkbox, allMovies, keyword, setFindMovies, findMovies]);

 //useEffect(() => {
  //setErrorMessage('');
  //if (!keyword && checkbox) {
  // console.log(keyword)
  //setErrorMessage('Введите ключевое слово');
  // setEmpty(true)
  // setSuccessfulSearch(false)
  //localStorage.removeItem('foundUserMovies')
  //}
  //if (keyword === '') {
  //setEmpty(true)
  //}
  //}, [keyword, checkbox]);

  //useEffect(()=> {
  //if(keyword === '' && checkbox){
  //setQuery(false)
  //setErrorMessage('Введите ключевое слово');
  //}
  //},[keyword, checkbox]);
