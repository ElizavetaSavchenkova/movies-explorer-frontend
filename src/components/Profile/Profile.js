import React from 'react';
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormWithValidation } from "../../hooks/useFormValidation/useFormValidation";
import './Profile.css';

function Profile({ onEditProfile, onSignOut, loggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const isValidProfileInfo = isValid && (currentUser.name !== values.name || currentUser.email !== values.email);

  function handleSubmit(event) {
    event.preventDefault()
    onEditProfile(values);
    resetForm({ name: currentUser.name, email: currentUser.email }, {}, false);
  }

  useEffect(() => {
    resetForm({ name: currentUser.name, email: currentUser.email }, {}, false);
  }, [resetForm, currentUser]);

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__user-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="profile__field">
          <label className="profile__data">
            <span className="profile__data-name">Имя</span>
            <input className={`profile__data-input ${errors.name ? "auth__form-input_error" : ""}`}
              id="nameProfile"
              type="text"
              name="name"
              placeholder="Имя"
              required
              onChange={handleChange}
              value={values.name || ''}
              minLength="2"
              maxLength="30" />
          </label>
          <span className="profile__data-input-error">{errors.name}</span>
          <label className="profile__data">
            <span className="profile__data-name">E-mail</span>
            <input className={`profile__data-input ${errors.email ? "auth__form-input_error" : ""}`}
              id="emailProfile"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              value={values.email || ''}
            />
          </label>
          <span className="profile__data-input-error">{errors.email}</span>
          <div className="profile__buttons">
            <button aria-label="Редактировать профиль" className="profile__button" type="submit" disabled={!isValidProfileInfo}>Редактировать</button>
            <button aria-label="Выйти из аккаунта" className="profile__button profile__button_logout" type="submit" onClick={onSignOut}>Выйти из аккаунта</button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default Profile;


