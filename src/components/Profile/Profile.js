import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import './Profile.css';


function Profile({ onUpdateUser, onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(event) {
    event.preventDefault()
    onUpdateUser({ name, email });
  }

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    console.log(currentUser.email);
    console.log(currentUser.email)
  }, [currentUser])

  function handleChangeNameProfile(event) {
    setName(event.target.value)
  }

  function handleСhangeEmailProfile(event) {
    setEmail(event.target.value)
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__user-form" onSubmit={handleSubmit}>
        <fieldset className="profile__field">
          <label className="profile__data">
            <span className="profile__data-name">Имя</span>
            <input className="profile__data-input" id="nameProfile" type="text" name="nameProfileInput"
              placeholder="Имя" required onChange={handleChangeNameProfile} value={name || ''} />
          </label>
          <label className="profile__data">
            <span className="profile__data-name">E-mail</span>
            <input className="profile__data-input" id="emailProfile" type="email" name="emailProfileInput"
              placeholder="Email" required onChange={handleСhangeEmailProfile} value={email || ''} />
          </label>
          <div className="profile__buttons">
            <button aria-label="Редактировать профиль" className="profile__button" type="submit" onClick={onEditProfile}>Редактировать</button>
            <button aria-label="Выйти из аккаунта" className="profile__button profile__button_logout" type="submit" onClick={onSignOut}>Выйти из аккаунта</button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default Profile;


