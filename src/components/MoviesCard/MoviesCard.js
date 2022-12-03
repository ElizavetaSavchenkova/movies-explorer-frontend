
import React from "react";
import { useState } from "react";
import './MoviesCard.css';
import movieImg from '../../images/film1.svg';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function MoviesCard({ movie, handleSaveMovie, handleDeleteMovies }) {
  const [saved, setSaved] = useState(true);
  const location = useLocation();
  const urlsave = location.pathname === "/saved-movies";
  const url = location.pathname === "/movies";
  const [meow, setMeow] = useState(false);
  const { nameRU, duration, image, trailerLink, trailer } = movie;

  //const movieDuration = (movie) => `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`

  const movieInformation = {
    country: movie.country || "Информация отсутствует",
    director: movie.director || "Информация отсутствует",
    duration: movie.duration,
    year: movie.year || "Информация отсутствует",
    description: movie.description || "Информация отсутствует",
    trailerLink: movie.trailerLink,
    image: `${movie.image === null ? `${movieImg}` : `https://api.nomoreparties.co${movie.image?.url}`}`,
    nameRU: movie.nameRU || "Информация отсутствует",
    nameEN: movie.nameEN || "Информация отсутствует",
    thumbnail: `https://api.nomoreparties.co${movie.image?.formats?.thumbnail?.url}`,
    movieId: movie.id,
  };

  const [buttonState, setButtonState] = useState(false);

  //useEffect(() => {
  //setButtonState(false)
  //})

  function addedMovie() {
    //setSaved(false)
    setButtonState(true)
    console.log(buttonState)
    //setMeow(true)
    handleSaveMovie(movieInformation);
    console.log(saved);
    console.log(meow)
    console.log(movieInformation)
    console.log('Карточка сохранилась')
  };

  //const deletedMovie = () => {
  // const movieId = movie.movieId
  //const id = movie.id;
  //const ids = movie._id;
  //handleDeleteMovies(ids);
  //setSaved(false)
  //console.log(saved)
  //console.log(movie.movieId)
  //console.log(movie)
  //console.log(movieId)
  //console.log(id)
  //console.log(movieInformation.movieId)
  //console.log(ids)
  //console.log('Карточка удалилась')
  //};

  function deletedMovie() {
    const movieId = movie.movieId
    const id = movie.id;
    const ids = movie._id;
    handleDeleteMovies(ids);
    setSaved(false)
    console.log(saved)
    console.log(movie.movieId)
    console.log(movie)
    console.log(movieId)
    console.log(id)
    console.log(movieInformation.movieId)
    console.log(ids)
    console.log('Карточка удалилась')
  };

  const mathDuration = movie.duration >= 60 ? `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м` : `${movie.duration % 60}м`;

  return (
    <div className="movies__card">
      <div className="movies__card-description">
        <div className="movies__card-description-text">
          <h3 className="movies__card-title">{nameRU}</h3>
          <p className="movies__card-duration">{mathDuration}</p>
        </div>
        {url &&
          <button aria-label="Добавить в избранное" className={`movies__card-button movies__card-button${!buttonState ? '_disaible' : '_active'}`} type="button" onClick={addedMovie} />
        }
        {urlsave &&
          <button aria-label="Добавить в избранное" className='movies__card-button movies__card-button_delete' type="button" onClick={deletedMovie} />
        }


      </div>
      <a className="movies__card-link-trailer" href={trailerLink ? trailerLink : trailer} target="_blank" rel="noreferrer">
        <img src={image.url ? `https://api.nomoreparties.co${image.url}` : image} className="movies__image" alt="Фотокарточка фильма" />
      </a>
    </div>
  );
}

export default MoviesCard;
