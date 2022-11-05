import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__info">
          <p className="footer__info-data">&copy; 2022</p>
          <div className="footer__info-links">
            <a href="https://practicum.yandex.ru" rel="noreferrer" target="_blank" className="footer__info-link">Яндекс.Практикум</a>
            <a href="https://github.com" rel="noreferrer" target="_blank" className="footer__info-link">Github</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
