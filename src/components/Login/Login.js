import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Login() {
  return (
    <>
      <AuthForm
        head="Рады видеть!"
        children={
          <>
            <label className="auth__form-label">
              <span className="auth__form-input-name">E-mail</span>
              <input className="auth__form-input" id="emailLog" type="email" name="emailLogInput"
                placeholder="Email" required />
              <span className="auth__form-input-error"></span>
            </label>
            <label className="auth__form-label">
              <span className="auth__form-input-name">Пароль</span>
              <input className="auth__form-input" id="passwordLog" type="password" name="passwordLogInput"
                placeholder="Пароль" autoComplete="off" required />
              <span className="auth__form-input-error"></span>
            </label>
          </>
        }
        text="Ещё не зарегистрированы?"
        path="/signup"
        link="Регистрация"
      />
    </>
  )
};

export default Login
