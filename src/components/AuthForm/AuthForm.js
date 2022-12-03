import { useLocation, Link } from 'react-router-dom';
import './AuthForm.css';
import headerLogo from '../../images/logo-header.svg';

function AuthForm({ onSubmit, head, children, text, path, link }) {
  const location = useLocation();
  const url = location.pathname === '/signin';
  const buttonText = url ? 'Войти' : 'Зарегистрироваться';

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <section className="auth" >
      <form className="auth__form" onSubmit={handleSubmit}>
        <Link to='/' className="auth__form-logo">
          <img className="auth__form-logo-pic" alt="Логотип" src={headerLogo} />
        </Link>
        <h2 className="auth__form-title">{head}</h2>
        <fieldset className="auth__form-fieldset">
          {children}
          <button className={`auth__button ${!url ? "auth__button_register" : ""}`} type="submit">{buttonText}</button>
        </fieldset>
        <p className="auth__form-text">{text}
          <Link to={path} className="auth__form-text-link">{link}</Link>
        </p>
      </form>
    </section>
  )
}

export default AuthForm

//зеленая полосочка при выборе, убрать красный текст ошибки
