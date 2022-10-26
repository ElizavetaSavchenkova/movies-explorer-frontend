import React from "react";
import './Promo.css';

function Promo() {
  return (
    <section class="promo">
      <div class="promo__container">
        <div class="promo__information">
          <h1 class="promo__information-head">Учебный проект студента факультета Веб-&zwj;разработки.</h1>
          <p class="promo__information-description">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <a href="https://practicum.yandex.ru/" rel="noreferrer" target="_blank" class="promo__button">Узнать больше</a>
        </div>
        <div className="promo__logo"></div>
      </div>
    </section>

  )
}

export default Promo

