import React from "react";
import { useLocation } from "react-router-dom";
import failedAction from "../../images/failedAction.svg"
import successfulAction from '../../images/successfulAction.svg'
import './InfoTooltip.css';

function InfoTooltip({ name, isOpen, onClose, infoMessage }) {

  const location = useLocation();
  const pathProfile = location.pathname === '/profile';
  const pathAuth = ['/movies', '/signin'];

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : ""}`} >
      <div className="popup__container">
        {pathAuth.includes(location.pathname) &&
          <div className="popup__info-container">
            <img className="popup__info-pic" alt="Результат" src={infoMessage ? successfulAction : failedAction} />
            <h2 className="popup__info-text">{infoMessage ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз'}</h2>
            <button className="popup__close-button button" type="button" onClick={onClose}></button>
          </div>
        }
        {pathProfile &&
          <div className="popup__info-container">
            <img className="popup__info-pic" alt="Результат" src={infoMessage ? successfulAction : failedAction} />
            <h2 className="popup__info-text">{infoMessage ? 'Вы успешно обновили информацию профиля!' : 'К сожалению, не удалось обновить информацию в профиле.'}</h2>
            <button className="popup__close-button button" type="button" onClick={onClose}></button>
          </div>
        }
      </div>
    </div>
  )
}

export default InfoTooltip
