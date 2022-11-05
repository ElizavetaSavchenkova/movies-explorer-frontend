import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Register() {
  return (
    <>
      <AuthForm
        head="Добро пожаловать!"
        children={
          <>
            <label className="auth__form-label">
              <span className="auth__form-input-name">Имя</span>
              <input className="auth__form-input" id="nameReg" name="nameRegInput" type="text"
                placeholder="Имя" required />
              <span className="auth__form-input-error"></span>
            </label>
            <label className="auth__form-label">
              <span className="auth__form-input-name">E-mail</span>
              <input className="auth__form-input auth__form-input_email" id="emailReg" type="email" name="emailRegInput"
                placeholder="Email" required />
              <span className="auth__form-input-error"></span>
            </label>
            <label className="auth__form-label">
              <span className="auth__form-input-name">Пароль</span>
              <input className="auth__form-input auth__form-input_password" id="passwordReg" type="password" name="passwordRegInput"
                placeholder="Пароль" autoComplete="off" required />
              <span className="auth__form-input-error">Что-то пошло не так...</span>
            </label>
          </>
        }
        button="Зарегистрироваться"
        text="Уже зарегистрированы?"
        path="/signin"
        link="Войти"
      />
    </>
  );
}

export default Register

//что-то пошло не так вставлено для примера, т.к. пока не прописана валидация"//
