import React from 'react';
import './Promo.css';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__information">
          <h1 className="promo__information-head">Учебный проект студента факультета Веб-&zwj;разработки.</h1>
          <p className="promo__information-description">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <a href="https://practicum.yandex.ru/" rel="noreferrer" target="_blank" className="promo__button">Узнать больше</a>
        </div>
        <div className="promo__logo"></div>
      </div>
    </section>

  )
}

export default Promo

