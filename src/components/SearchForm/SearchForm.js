import React from 'react';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';

function SearchForm({ handleSubmit, handleChange, keyword, errorFormMessage, errorMovieMessage,
  handleCheckbox, checkbox, checkboxStatus }) {

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <div className="search-form__container">
        <img className="search-form__icon-magnifier" src={searchIcon} alt="Иконка-'лупа'" />
        <div className="search-form__input-container">
          <input
            className="search-form__input"
            id="searchFilm"
            type="text"
            name="searchFilm"
            placeholder="Фильм"
            value={keyword || ''}
            onChange={handleChange}
            required />
          <button aria-label="Найти фильм" className="search-form__button" type="submit"></button>
        </div>
      </div>
      <div className="search-form__shortfilms">
        <input className="search-form__switch-checkbox"
          id="switchCheckbox"
          type="checkbox"
          name="switchCheckbox"
          checked={checkboxStatus}
          onClick={handleCheckbox}
          checkbox={checkbox}
        />
        <label className={`search-form__slider ${checkbox ? 'search-form__slider_active' : null}`} htmlFor="switchCheckbox">
          <div className="search-form__switch"></div>
        </label>
        <p className="search-form__shortfilms-title">Короткометражки</p>
      </div>
      <p className="search-form__input-error">{errorFormMessage}</p>
      <p className="search-form__movies-error">{errorMovieMessage}</p>

    </form>
  );
}

export default SearchForm;

