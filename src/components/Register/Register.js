import React from 'react';
import { useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Register({ onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')

    function handleNameChange(event) {
      setName(event.target.value);

    }

    function handleEmailChange(event) {
      setEmail(event.target.value);

    }

    function handlePasswordChange(event) {
      setPassword(event.target.value);

    }

    function handleRegister() {
      onRegister(name, email, password);
      setName('');
      setEmail('');
      setPassword('');
      console.log(name)
    }

    //function handleSubmit(event) {
     // event.preventDefault();
    // onForm({ email, password });
     // console.log('handlesubmit в register')
    //}
    return (
      <>
        <AuthForm
          onSubmit={handleRegister}
          head="Добро пожаловать!"
          children={
            <>
              <label className="auth__form-label">
                <span className="auth__form-input-name">Имя</span>
                <input className="auth__form-input" id="nameReg" name="nameRegInput" type="text"
                  placeholder="Имя" required value={name || ''} onChange={handleNameChange} />
                <span className="auth__form-input-error"></span>
              </label>
              <label className="auth__form-label">
                <span className="auth__form-input-name">E-mail</span>
                <input className="auth__form-input auth__form-input_email" id="emailReg" type="email" name="emailRegInput"
                  placeholder="Email" required value={email || ''} onChange={handleEmailChange} />
                <span className="auth__form-input-error"></span>
              </label>
              <label className="auth__form-label">
                <span className="auth__form-input-name">Пароль</span>
                <input className="auth__form-input auth__form-input_password" id="passwordReg" type="password" name="passwordRegInput"
                  placeholder="Пароль" autoComplete="off" required value={password || ''} onChange={handlePasswordChange} />
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
