import React from "react";
import './Footer.css';
//import { Switch, Route, Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <h3 class="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__info">
          <p className="footer__info-data">&copy; 2022</p>
          <div className="footer__info-links">
            <a href="https://practicum.yandex.ru" rel="noreferrer" target="_blank" className="footer__info-link">Яндекс.Практикум</a>
            <a href="https://github.com" rel="noreferrer" target="_blank" className="footer__info-link">Github</a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Footer
