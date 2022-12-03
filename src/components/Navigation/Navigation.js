import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../Navigation/Navigation.css';
import profileIcon from '../../images/profile-icon.svg';

////



function Navigation() {
  const location = useLocation();
  const path = location.pathname === '/';
  return (
    <div className={`navigation ${path ? "navigation_theme_dark" : ""}`}>
      <nav className="navigation__container">
        <div className="navigation__films">
          <Link to="/movies" className={`navigation__films-link ${path ? "navigation__films-link_theme_dark" : ""}`}>Фильмы</Link>
          <Link to="/saved-movies" className={`navigation__films-link ${path ? "navigation__films-link_theme_dark" : ""}`}>Сохранённые фильмы</Link>
        </div>
        <Link to="/profile" className="navigation__profile-link">
          <img className="navigation__profile-icon" src={profileIcon} alt="Иконка профиля" />
          <span className={`navigation__profile-text ${path ? "navigation__profile-text_theme_dark" : ""}`}>Аккаунт</span>
        </Link>
      </nav>
    </div>
  );
}

export default Navigation;
