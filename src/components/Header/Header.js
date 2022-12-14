import React from 'react';
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import headerLogo from '../../images/logo-header.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import './Header.css';

function Header({ loggedIn, onMenuClick }) {
  return (
    <header className={`header ${loggedIn ? "header_theme_light" : ""}`}>
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={headerLogo} alt="Логотип" />
        </Link>
        {!loggedIn &&
          <div className="header__info">
            <Link to="/signup" className="header__registration">Регистрация</Link>
            <Link to='/signin' className="header__login">Войти</Link>
          </div>
        }
        {loggedIn &&
          <>
            <Navigation />
            <BurgerMenu onMenuClick={onMenuClick} />
          </>
        }
      </div>
    </header >
  )
}

export default Header
