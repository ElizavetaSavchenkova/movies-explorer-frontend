import React from "react";
import './AboutMe.css';
import studentPic from '../../images/photo.jpg'
//import { Switch, Route, Link } from 'react-router-dom';

function AboutMe() {
  return (
    <section class="about-me">
      <div class="content__about">Студент</div>
      <div class="about-me__container">
        <div class="about-me__information">
          <h3 class="about-me__information-name">Елизавета</h3>
          <p class="about-me__information-about">Фронтенд-разработчик, 25 лет</p>
          <p class="about-me__information-description">Меня зовут Лиза, мне 25. Родилась, проживаю и работаю в Москве. На данный момент занимаюсь автоматизацией процессов в РГБ. Решила пойти на курсы, чтобы усовершенствовать свои знания и научиться чему-то новому. Интересна сфера разработки. Люблю животных, природу, фэнтези. Мечтаю создать свою видеоигру.</p>
          <a href="https://github.com/ElizavetaSavchenkova" rel="noreferrer" target="_blank" className="about-me__link">Github</a>
        </div>
        <img class="about-me__img" src={studentPic} alt="Фото студента" />
      </div>
    </section>

  )
}

export default AboutMe
