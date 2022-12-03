import React from 'react';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import { useState, useRef, useEffect } from 'react';

//const handleCheckboxColor = () => {
// const checkbox = document.querySelector('.search-form__slider');
//checkbox.classList.toggle('search-form__slider_active');
//console.log('ЦВЕТ')
//};

function SearchForm({ handleSubmit, handleChange, keyword, errorFormMessage,
  handleCheckbox, checkbox, checkboxStatus }) {

  //const [isCheck, setIsChecked] = useState(false);

  //function handleCheckboxColor(event) {
  // if (checkbox) {
  // const checkbox = document.querySelector('.search-form__slider');
  // checkbox.classList.toggle('search-form__slider_active');
  //console.log('ПРИВЕТТТТ')
  //}
  //const checkboxChecked = event.target.checked;
  //localStorage.setItem('checkboxState', JSON.stringify(checkboxChecked))
  //setIsChecked(checkboxChecked);


  //}

  //const checkboxRef = useRef();
  //const testRef = { current: checkboxRef.current };

  //useEffect(() => {
  //console.log(checkbox)
  //localStorage.setItem('checkboxState', JSON.stringify(checkbox))
  //localStorage.getItem('checkboxState');
  //const checkbox = localStorage.getItem('checkboxState');
  // console.log(localStorage)
  // console.log(checkbox)
  //checkboxRef.current = testRef;
  //console.log(testRef)
  //console.log(checkbox)
  //console.log('работает')
  //console.log(checkboxRef.current);


  //}, [checkbox]);




  //const [checkBoxStatus, setCheckBoxStatus] = useState(false)
  //const handleCheckBoxChange = (e) => {
  // setCheckBoxStatus(e.target.checked)
  //}

  //React.useEffect(() => {
  //const query = localStorage.getItem('keyWord')
  //setKeyWord(query)
  // const checkBox = JSON.parse(localStorage.getItem('checkBoxStatus'))
  //setCheckBoxStatus(checkBox)
  //},[])

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
          onChange={handleCheckbox}
          checked={checkboxStatus}
          //onChange={handleCheckBoxChange}
          onClick={handleCheckbox}
          checkbox={checkbox}
          //defaultChecked={checkbox}
        //ref={checkboxRef}
        />
        <label className={`search-form__slider ${checkbox ? 'search-form__slider_active' : null}`} htmlFor="switchCheckbox">
          <div className="search-form__switch"></div>
        </label>
        <p className="search-form__shortfilms-title">Короткометражки</p>
      </div>
      <h2 className="search-form__input-error">{errorFormMessage}</h2>
    </form>
  );
}

export default SearchForm;

//.//const [isCheck, setIsChecked] = useState(false);
  //const [isChecked, setIsCecked] = useState(true);

  //function handleCheckboxChange(event) {
  //const checkboxChecked = event.target.checked;
  //localStorage.setItem('checkboxChecked', JSON.stringify(checkboxChecked));
  //setIsChecked(checkboxChecked);
  //console.log('ПРИВЕТТТТ')
  //}

  //const isCheckedHandler = () => {
  //setIsCecked(!isChecked)
  //console.log('работает')
  //}
