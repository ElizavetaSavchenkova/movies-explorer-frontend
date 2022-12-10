import React, { useEffect } from 'react';
import { useState } from 'react';
import { url } from '../../utils/auth';
import AuthForm from '../AuthForm/AuthForm';
import { useFormWithValidation } from "../FormValidation/FormValidation";

function Register({ onRegister, errorText }) {
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  // const [name, setName] = useState('');

  //const {name, email, password} = values;
  //props.onRegister({name, email, password});

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  //function handleNameChange(event) {
  //setName(event.target.value);
  //}

  //function handleEmailChange(event) {
  //setEmail(event.target.value);
  //}

  //function handlePasswordChange(event) {
  //setPassword(event.target.value);
  // }


  function handleRegister() {
    console.log('Привет')
    console.log(values)
    //const {name, email, password} = values
    //console.log(values.email, name, password)
    onRegister(values);

    ////старая версия
    //onRegister({ name, email, password });
    //setName('');
    //setEmail('');
    //setPassword('');
    //console.log(name)

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

