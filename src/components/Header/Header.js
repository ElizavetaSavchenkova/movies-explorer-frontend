import React from "react";
import './Header.css';
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import headerLogo from '../../images/headerLogo.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu'
//import { Switch, Route, Link } from 'react-router-dom'//



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
