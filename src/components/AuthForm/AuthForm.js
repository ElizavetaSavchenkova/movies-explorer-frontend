import { useLocation } from 'react-router-dom';

import './AuthForm.css';
import headerLogo from '../../images/headerLogo.svg';

function AuthForm({ head, children, text, path, link }) {
  const location = useLocation();
  const url = location.pathname === '/signin';
  const buttonText = url ? 'Войти' : 'Зарегистрироваться';

  return (
    <section className="auth">
      <form className="auth__form">
        <a href='/' className="auth__form-logo">
          <img className="auth__form-logo-pic" alt="Логотип" src={headerLogo} />
        </a>
        <h2 className="auth__form-title">{head}</h2>
        <fieldset className="auth__form-fieldset">
          {children}
          <button className={`auth__button ${!url ? "auth__button_register" : ""}`}>{buttonText}</button>
        </fieldset>
        <p className="auth__form-text">{text}
          <a href={path} className="auth__form-text-link">{link}</a>
        </p>
      </form>
    </section>
  )
}

export default AuthForm

//зеленая полосочка при выборе, убрать красный текст ошибки
