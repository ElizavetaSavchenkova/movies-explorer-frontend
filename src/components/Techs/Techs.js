import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="content__about">Технологии</h2>
        <div className="techs__information">
          <h3 className="techs__information-title">7 технологий</h3>
          <p className="techs__information-subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>
        <ul className="techs__technologies">
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
