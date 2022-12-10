import React from 'react';
import { useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useFormWithValidation } from "../FormValidation/FormValidation";


function Login({ onLogin }) {
  //const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  //function handleEmailChange(event) {
  //setEmail(event.target.value);
  // }

  // function handlePasswordChange(event) {
  // setPassword(event.target.value);
  //}
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleLogin() {
    onLogin(values);
    //setEmail('');
    //setPassword('');
  }

  return (
    <>
      <AuthForm
        isValid={isValid}
        onSubmit={handleLogin}
        head="Рады видеть!"
        children={
          <>
            <label className="auth__form-label">
              <span className="auth__form-input-name">E-mail</span>
              <input className={`auth__form-input ${errors.email ? "auth__form-input_error" : ""} ${values.email ? "auth__form-input_valid" : ""}`}
                id="emailLog"
                type="email"
                name="email"
                placeholder="Email"
                required
                value={values.email || ''}
                onChange={handleChange} />
              <span className="auth__form-input-error">{errors.email}</span>
            </label>
            <label className="auth__form-label">
              <span className="auth__form-input-name">Пароль</span>
              <input className={`auth__form-input ${errors.password ? "auth__form-input_error" : ""} ${values.password ? "auth__form-input_valid" : ""}`}
                id="passwordLog"
                type="password"
                name="password"
                placeholder="Пароль"
                autoComplete="off"
                minLength="8"
                maxLength="30"
                required
                value={values.password || ''}
                onChange={handleChange} />
              <span className="auth__form-input-error">{errors.password}</span>
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
