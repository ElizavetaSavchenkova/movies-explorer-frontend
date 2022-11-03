import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="content__about">О проекте</h2>
      <ul className="about-project__container">
        <li className="about-project__info">
          <h3 className="about-project__info-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__info-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about-project__info">
          <h3 className="about-project__info-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__info-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className="about-project__figure">
        <li className="about-project__figure-title about-project__figure-title_color">1 неделя</li>
        <li className="about-project__figure-title">4 недели</li>
        <li className="about-project__figure-subtitle">Back-end</li>
        <li className="about-project__figure-subtitle">Front-end</li>
      </ul>
    </section>
  )
}

export default AboutProject

