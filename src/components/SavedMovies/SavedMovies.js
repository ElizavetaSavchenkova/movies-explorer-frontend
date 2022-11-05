
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList card="false" />
    </>
  );
}

export default SavedMovies;
