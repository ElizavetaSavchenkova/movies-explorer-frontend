import React, { useEffect } from "react";
import { useState } from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';



function MoviesCardList({ movies, savedMovies, handleSaveMovie, handleDeleteMovies }) {

  const [width, setWidth] = useState(window.innerWidth);
  const [amount, setAmount] = useState(12);

  useEffect(() => {
    if (width >= 1280) {
      setAmount(12);
    }
    if (width <= 1100) {
      setAmount(8);
    }
    if (width <= 650) {
      setAmount(5);
    }
  }, [width])

  function handleMoreMovies() {
    if (width >= 1280) {
      setAmount(amount + 3);
    } else {
      setAmount(amount + 2);
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

  let cardList = movies.slice(0, amount);

  const buttonMoreMovies = movies.length > 0 && movies.length > amount;

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
