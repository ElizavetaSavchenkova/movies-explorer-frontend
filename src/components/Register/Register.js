import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useFormWithValidation } from "../../hooks/useFormValidation/useFormValidation";

function Register({ onRegister, errorText }) {

  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleRegister() {
    onRegister(values);
  }

  return (
    <>
      <AuthForm
        isValid={isValid}
        onSubmit={handleRegister}
        head="Добро пожаловать!"
        children={
          <>
            <label className="auth__form-label">
              <span className="auth__form-input-name">Имя</span>
              <input className={`auth__form-input ${errors.name ? "auth__form-input_error" : ""} ${values.name ? "auth__form-input_valid" : ""}`}
                id="nameReg"
                name="name"
                type="text"
                placeholder="Имя"
                minLength="2"
                maxLength="30"
                required
                value={values.name || ''}
                onChange={handleChange}
              />
              <span className="auth__form-input-error">{errors.name}</span>
            </label>
            <label className="auth__form-label">
              <span className="auth__form-input-name">E-mail</span>
              <input className={`auth__form-input ${errors.email ? "auth__form-input_error" : ""} ${values.email ? "auth__form-input_valid" : ""}`}
                id="emailReg"
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
                id="passwordReg"
                type="password"
                name="password"
                placeholder="Пароль"
                autoComplete="off"
                minLength="8"
                maxLength="30"
                required
                value={values.password || ''}
                onChange={handleChange}
              />
              <span className="auth__form-input-error">{errors.password}</span>
            </label>
          </>
        }
        button="Зарегистрироваться"
        text="Уже зарегистрированы?"
        path="/signin"
        link="Войти"
        errorText={errorText}
      />
    </>
  );
}

export default Register

