import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'

function NotFound() {
  return (
    <section className="notfound">
      <div className="notfound__container">
        <h2 className="notfound__error">404</h2>
        <p className="not-found__error-text">Страница не найдена</p>
        <Link to="/" className="not-found__error-link">Назад</Link>
      </div>
    </section>
  );
}

export default NotFound;
