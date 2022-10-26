import React from "react";
import './Techs.css';
//import { Switch, Route, Link } from 'react-router-dom';

function Techs() {
  return (
    <section class="techs">
      <div class="techs__container">
        <h2 class="content__about">Технологии</h2>
        <div class="techs__information">
          <h3 className="techs__information-title">7 технологий</h3>
          <p className="techs__information-subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>
        <ul class="techs__technologies">
          <li className="techs__technologies-item">HTML</li>
          <li className="techs__technologies-item">CSS</li>
          <li className="techs__technologies-item">JS</li>
          <li className="techs__technologies-item">React</li>
          <li className="techs__technologies-item">Git</li>
          <li className="techs__technologies-item">Express.js</li>
          <li className="techs__technologies-item">mongoDB</li>
        </ul>
      </div>
    </section>
  )
}

export default Techs
