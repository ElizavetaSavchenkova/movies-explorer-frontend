import React, { useEffect } from "react";
import { useState } from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';



function MoviesCardList({ movies, savedMovies, handleSaveMovie, handleDeleteMovies }) {

  const [width, setWidth] = useState(1280)

  useEffect(()=> {
    if (width < 768) {
      console.log('ШИРИНА')
    }
  })

  let cardList = movies.slice(0);
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
          //handleAddFav={handleAddFav}
          />
        ))}
      </div>
    </section >
  );
}

export default MoviesCardList;

//кнопка "Еще" скрыта для примера, как на макете//
// временно стоит по 12 и 3 карточки. потом вставлять через массив"






