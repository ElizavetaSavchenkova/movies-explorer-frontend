
import { Route, useLocation } from "react-router-dom";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import film1 from '../../images/film1.svg';
import film2 from '../../images/film2.svg';
import film3 from '../../images/film3.svg';
import film4 from '../../images/film4.svg';
import film5 from '../../images/film5.svg';
import film6 from '../../images/film6.svg';
import film7 from '../../images/film7.svg';
import film8 from '../../images/film8.svg';
import film9 from '../../images/film9.svg';
import film10 from '../../images/film10.svg';
import film11 from '../../images/film11.svg';
import film12 from '../../images/film12.svg';

function MoviesCardList() {
  const location = useLocation();
  const url = location.pathname === "/saved-movies";

  return (
    <section className="movies">
      <div className="movies__cardlist">
        <Route path="/movies">
          <MoviesCard picture={film1} cardtitle={'33 слова о дизайне'} duration={'1ч 47м'} />
          <MoviesCard picture={film2} cardtitle={'33 слова о дизайне'} duration={'1ч 47м'} />
          <MoviesCard picture={film3} cardtitle={'33 слова о дизайне'} duration={'1ч 47м'} />
          <MoviesCard picture={film4} cardtitle={'33 слова о дизайне'} duration={'1ч 47м'} />
          <MoviesCard picture={film5} cardtitle={'33 слова о дизайне'} duration={'1ч 47м'} />
          <MoviesCard picture={film6} cardtitle={'33 слова о дизайне'} duration={'1ч 47м'} />
          <MoviesCard picture={film7} cardtitle={'33 слова о дизайне'} duration={'1ч 47м'} />
          <MoviesCard picture={film8} cardtitle={'33 слова о дизайне'} duration={'1ч 47м'} />
          <MoviesCard picture={film9} cardtitle={'33 слова о дизайне'} duration={'1ч 47м'} />
          <MoviesCard picture={film10} cardtitle={'33 слова о дизайне'} duration={'1ч 47м'} />
          <MoviesCard picture={film11} cardtitle={'33 слова о дизайне'} duration={'1ч 47м'} />
          <MoviesCard picture={film12} cardtitle={'33 слова о дизайне'} duration={'1ч 47м'} />
        </Route>
        <Route path="/saved-movies">
          <MoviesCard picture={film1} cardtitle={'33 слова о дизайне'} duration={'1ч 47м'} />
          <MoviesCard picture={film2} cardtitle={'33 слова о дизайне'} duration={'1ч 47м'} />
          <MoviesCard picture={film3} cardtitle={'33 слова о дизайне'} duration={'1ч 47м'} />
        </Route>
      </div>
      <h3 className="movies__cardlist-showerror">Поиск не дал результатов</h3>
      <button aria-label="Просмотреть еще карточки" className={`movies__cardlist-button movies__cardlist-button${url ? "_hidden" : ""}`} type="button">Еще</button>
    </section>
  );
}

export default MoviesCardList;

/* кнопка "Еще" скрыта для примера, как на макете*/







