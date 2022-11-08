import React from 'react';
import './AboutMe.css';
import studentPic from '../../images/photo.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <div className="content__about">Студент</div>
      <div className="about-me__container">
        <div className="about-me__information">
          <h3 className="about-me__information-name">Елизавета</h3>
          <p className="about-me__information-about">Фронтенд-разработчик, 25 лет</p>
          <p className="about-me__information-description">Меня зовут Лиза, мне 25. Родилась, проживаю и работаю в Москве. На данный момент занимаюсь автоматизацией процессов в РГБ. Решила пойти на курсы, чтобы усовершенствовать свои знания и научиться чему-то новому. Интересна сфера разработки. Люблю животных, природу, фэнтези. Мечтаю создать свою видеоигру.</p>
          <a href="https://github.com/ElizavetaSavchenkova" rel="noreferrer" target="_blank" className="about-me__link">Github</a>
        </div>
        <img className="about-me__img" src={studentPic} alt="Фото студента" />
      </div>
    </section>

  )
}

export default AboutMe
