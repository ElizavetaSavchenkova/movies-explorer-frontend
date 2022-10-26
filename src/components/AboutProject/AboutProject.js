import React from "react";
import './AboutProject.css';
//import { Switch, Route, Link } from 'react-router-dom';

function AboutProject() {
  return (
    <section class="about-project">
      <h2 class="content__about">О проекте</h2>
      <ul class="about-project__container">
        <li class="about-project__info">
          <h3 class="about-project__info-title">Дипломный проект включал 5 этапов</h3>
          <p class="about-project__info-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li class="about-project__info">
          <h3 class="about-project__info-title">На выполнение диплома ушло 5 недель</h3>
          <p class="about-project__info-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul class="about-project__figure">
        <li class="about-project__figure-title about-project__figure-title_color">1 неделя</li>
        <li class="about-project__figure-title">4 недели</li>
        <li class="about-project__figure-subtitle">Back-end</li>
        <li class="about-project__figure-subtitle">Front-end</li>
      </ul>
    </section>
  )
}

export default AboutProject

