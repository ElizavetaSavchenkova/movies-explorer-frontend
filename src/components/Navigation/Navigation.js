import { Link } from 'react-router-dom';
import '../Navigation/Navigation.css';
import profileIcon from '../../images/profile-image.svg';

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navigation__container">
        <div className="navigation__films">
          <Link to="/movies" className="navigation__films-link">Фильмы</Link>
          <Link to="/saved-movies" className="navigation__films-link navigation__films-link_saved">Сохранённые фильмы</Link>
        </div>
        <Link to="/profile" className="navigation__profile-link">
          <img className="navigation__profile-icon" src={profileIcon} alt="Иконка профиля" />
          <span className="navigation__profile-text">Аккаунт</span>
        </Link>
      </nav>
    </div>
  );
}

export default Navigation;
