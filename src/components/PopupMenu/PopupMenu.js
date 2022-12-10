import React from "react";
import { Link } from "react-router-dom";
import './PopupMenu.css';
import profileIcon from '../../images/profile-icon.svg';

function PopupMenu({ isOpen, onMenuClick }) {

  return (
    <section className={`popup-menu ${isOpen ? 'popup-menu_is-opened' : ''}`}>
      <div className="popup-menu__container">
        <button className="popup-menu__close-button" type="button" onClick={onMenuClick} />
        <ul className="popup-menu__list">
          <li className="popup-menu__list-container">
            <Link to="/" exact={true} className="popup-menu__list-link" onClick={onMenuClick}>Главная</Link>
            <Link to="/movies" className="popup-menu__list-link" onClick={onMenuClick}>Фильмы</Link>
            <Link to="/saved-movies" className="popup-menu__list-link" onClick={onMenuClick}>Сохранённые фильмы</Link>
          </li>
        </ul>
        <div className="popup-menu__profile">
          <Link to="/profile" className="popup-menu__profile-link">
            <img className="popup-menu__profile-image" src={profileIcon} alt="Иконка профиля" />
            <span className="popup-menu__profile-text">Аккаунт</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PopupMenu;
