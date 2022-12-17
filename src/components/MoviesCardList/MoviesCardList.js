import React, { useEffect } from "react";
import { useState } from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import {
  MOVIES_TWELVE,
  MOVIES_EIGHT,
  MOVIES_FIVE,
  LARGE_SCREEN_WIDTH,
  MIDDLE_SCREEN_WIDTH,
  SMALL_SCREEN_WIDTH,
  MOVIES_THREE,
  MOVIES_TWO,
  MOVIES_NULL
} from "../../utils/const";

function MoviesCardList({ movies, savedMovies, handleSaveMovie, handleDeleteMovies }) {

  const [width, setWidth] = useState(window.innerWidth);
  const [amount, setAmount] = useState(MOVIES_TWELVE);

  useEffect(() => {
    if (width >= LARGE_SCREEN_WIDTH) {
      setAmount(MOVIES_TWELVE);
    }
    if (width <= MIDDLE_SCREEN_WIDTH) {
      setAmount(MOVIES_EIGHT);
    }
    if (width <= SMALL_SCREEN_WIDTH) {
      setAmount(MOVIES_FIVE);
    }
  }, [width])

  function handleMoreMovies() {
    if (width >= LARGE_SCREEN_WIDTH) {
      setAmount(amount + MOVIES_THREE);
    } else {
      setAmount(amount + MOVIES_TWO);
    }
  }

  function throttle(func, timeout) {
    let timer = null
    return function (...args) {
      if (!timer) {
        timer = setTimeout(() => {
          func.call(this, ...args)
          timer = null
        }, timeout)
      }
    }
  }

  useEffect(() => {
    const updateWidth = throttle(() => {
      setWidth(window.innerWidth);
    }, 500);
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  let cardList = movies.slice(MOVIES_NULL, amount);

  const buttonMoreMovies = movies.length > MOVIES_NULL && movies.length > amount;

  return (
    <section className="movies">
      <div className="movies__cardlist">
        {cardList.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            movie={movie}
            savedMovies={savedMovies}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovies={handleDeleteMovies}
          />
        ))}
      </div>
      {buttonMoreMovies && (
        <button aria-label="Просмотреть еще карточки" className="movies__cardlist-button" type="button"
          onClick={handleMoreMovies}>
          Ещё
        </button>
      )}
    </section >
  );
}

export default MoviesCardList;
