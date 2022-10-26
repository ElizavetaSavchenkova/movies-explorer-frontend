import React from "react";
import './Portfolio.css';
//import { Switch, Route, Link } from 'react-router-dom';

function Portfolio() {
  return (
    <section class="portfolio">
      <h3 class="portfolio__title">Портфолио</h3>
      <ul class="portfolio__container">
        <li class="portfolio__item">
          <a href="https://github.com/ElizavetaSavchenkova/how-to-learn" rel="noreferrer" target="_blank" className="portfolio__link">
            <p className="portfolio__link-name">Статичный сайт</p>
            <span className="portfolio__link-icon"></span>
          </a>
        </li>
        <li class="portfolio__item">
          <a href="https://github.com/ElizavetaSavchenkova/russian-travel" rel="noreferrer" target="_blank" className="portfolio__link">
            <p className="portfolio__link-name">Адаптивный сайт</p>
            <span className="portfolio__link-icon"></span>
          </a>
        </li>
        <li class="portfolio__item">
          <a href="https://github.com/ElizavetaSavchenkova/mesto-react" rel="noreferrer" target="_blank" className="portfolio__link">
            <p className="portfolio__link-name">Одностраничное приложение</p>
            <span className="portfolio__link-icon"></span>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio
//не забудь поправить ссылки
