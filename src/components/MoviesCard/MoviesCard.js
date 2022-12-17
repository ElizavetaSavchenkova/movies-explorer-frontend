
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';
import movieImg from '../../images/film1.svg';
import { ONE_HOUR_DURATION_MOVIE, NO_INFO_AVAILABLE } from "../../utils/const";

function MoviesCard({ movie, handleSaveMovie, handleDeleteMovies, savedMovies }) {
  const location = useLocation();
  const urlsave = location.pathname === "/saved-movies";
  const url = location.pathname === "/movies";
  const { nameRU, image, trailerLink, trailer } = movie;
  const [buttonState, setButtonState] = useState(false);
  const addedMovie = savedMovies.find((i) => i.movieId === movie.id);
  const mathDuration = movie.duration >= ONE_HOUR_DURATION_MOVIE ? `${Math.floor(movie.duration / ONE_HOUR_DURATION_MOVIE)}ч ${movie.duration % ONE_HOUR_DURATION_MOVIE}м` : `${movie.duration % ONE_HOUR_DURATION_MOVIE}м`;

  const movieInformation = {
    country: movie.country || NO_INFO_AVAILABLE,
    director: movie.director || NO_INFO_AVAILABLE,
    duration: movie.duration,
    year: movie.year || NO_INFO_AVAILABLE,
    description: movie.description || NO_INFO_AVAILABLE,
    trailerLink: movie.trailerLink,
    image: `${movie.image === null ? `${movieImg}` : `https://api.nomoreparties.co${movie.image?.url}`}`,
    nameRU: movie.nameRU || NO_INFO_AVAILABLE,
    nameEN: movie.nameEN || NO_INFO_AVAILABLE,
    thumbnail: `https://api.nomoreparties.co${movie.image?.formats?.thumbnail?.url}`,
    movieId: movie.id,
  };

  function deleteFavMovie() {
    handleDeleteMovies(addedMovie._id);
    setButtonState(false)
  }

  function addFavMovie() {
    setButtonState(true)
    handleSaveMovie(movieInformation);
  }

  function deleteSaveMovie() {
    const id = movie._id;
    handleDeleteMovies(id)
  };

  return (
    <div className="movies__card">
      <div className="movies__card-description">
        <div className="movies__card-description-text">
          <h3 className="movies__card-title">{nameRU}</h3>
          <p className="movies__card-duration">{mathDuration}</p>
        </div>
        {url && <button aria-label="Добавить фильм в избранное"
          className={`movies__card-button movies__card-button${!buttonState ? '_disable' : '_active'} ${addedMovie && 'movies__card-button_active'}`}
          type="button"
          onClick={addedMovie ? deleteFavMovie : addFavMovie} />
        }
        {urlsave && <button aria-label="Удалить фильм из избранного"
          className='movies__card-button movies__card-button_delete'
          type="button" onClick={deleteSaveMovie} />
        }
      </div>
      <a className="movies__card-link-trailer" href={trailerLink ? trailerLink : trailer} target="_blank" rel="noreferrer">
        <img src={image.url ? `https://api.nomoreparties.co${image.url}` : image} className="movies__image" alt="Фотокарточка фильма" />
      </a>
    </div>
  );
}

export default MoviesCard;

