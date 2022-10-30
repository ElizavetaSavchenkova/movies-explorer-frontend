import burgerIcon from '../../images/burger-icon.svg'
import './BurgerMenu.css';

function BurgerMenu({ onMenuClick }) {
  return (
    <img className="burger-menu" src={burgerIcon} alt="Иконка меню" onClick={onMenuClick} />
  )
}

export default BurgerMenu

