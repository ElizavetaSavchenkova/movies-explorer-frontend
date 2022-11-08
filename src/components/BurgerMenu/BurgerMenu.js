import React from 'react';
import './BurgerMenu.css';
import burgerIcon from '../../images/burger-icon.svg'

function BurgerMenu({ onMenuClick }) {
  return (
    <img className="burger-menu" src={burgerIcon} alt="Иконка меню" onClick={onMenuClick} />
  )
}

export default BurgerMenu

