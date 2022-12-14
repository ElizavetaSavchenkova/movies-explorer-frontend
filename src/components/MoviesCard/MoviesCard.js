
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';

function MoviesCard({ picture, cardtitle, duration }) {
  const [saveButton, setSaveButton] = useState(false);
  const location = useLocation();
  const url = location.pathname === "/saved-movies";

  function handleAddFav() {
    setSaveButton(!saveButton)
  }

  return (
    <div className="movies__card">
      <div className="movies__card-description">
        <div className="movies__card-description-text">
          <h3 className="movies__card-title">{cardtitle}</h3>
          <p className="movies__card-duration">{duration}</p>
        </div>
        <button aria-label="Добавить в избранное" className={`movies__card-button movies__card-button${url ? '_delete' :
          saveButton ? '_active' : '_disaible'}`} type="button" onClick={handleAddFav} />
      </div>
      <img src={picture} className="movies__image" alt="Фотокарточка фильма" />
    </div>
  );
}

export default MoviesCard;
