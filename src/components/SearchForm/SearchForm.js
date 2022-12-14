import React from 'react';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';

const handleCheckbox = () => {
  const checkbox = document.querySelector('.search-form__slider');
  checkbox.classList.toggle('search-form__slider_active');
};

function SearchForm() {
  return (
    <form className="search-form">
      <div className="search-form__container">
        <img className="search-form__icon-magnifier" src={searchIcon} alt="Иконка-'лупа'" />
        <div className="search-form__input-container">
          <input className="search-form__input" id="searchFilm" type="text" name="searchFilm" placeholder="Фильм" required />
          <button aria-label="Найти фильм" className="search-form__button" type="submit"></button>
        </div>
      </div>
      <div className="search-form__shortfilms">
        <input className="search-form__switch-checkbox" id="switchCheckbox" type="checkbox" name="switchCheckbox" onClick={handleCheckbox} />
        <label className="search-form__slider" htmlFor="switchCheckbox">
          <div className="search-form__switch"></div>
        </label>
        <p className="search-form__shortfilms-title">Короткометражки</p>
      </div>
    </form>
  );
}

export default SearchForm;
