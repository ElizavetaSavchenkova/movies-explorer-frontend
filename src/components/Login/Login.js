import React from 'react';
import { useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';


function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleLogin() {
    onLogin({ email, password });
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <AuthForm
        onSubmit={handleLogin}
        head="Рады видеть!"
        children={
          <>
            <label className="auth__form-label">
              <span className="auth__form-input-name">E-mail</span>
              <input className="auth__form-input" id="emailLog" type="email" name="emailLogInput"
                placeholder="Email" required value={email || ''} onChange={handleEmailChange} />
              <span className="auth__form-input-error"></span>
            </label>
            <label className="auth__form-label">
              <span className="auth__form-input-name">Пароль</span>
              <input className="auth__form-input" id="passwordLog" type="password" name="passwordLogInput"
                placeholder="Пароль" autoComplete="off" required value={password || ''} onChange={handlePasswordChange} />
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
