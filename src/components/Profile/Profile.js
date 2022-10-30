import './Profile.css';

function Profile() {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Елизавета!</h2>
      <form className="profile__user-form">
        <fieldset className="profile__field">
          <label className="profile__data">
            <span className="profile__data-name">Имя</span>
            <input className="profile__data-input" id="nameProfile" type="email" name="nameProfileInput"
              placeholder="Имя" required />
          </label>
          <label className="profile__data">
            <span className="profile__data-name">E-mail</span>
            <input className="profile__data-input" id="emailProfile" type="email" name="emailProfileInput"
              placeholder="Email" required />
          </label>
          <div className="profile__buttons">
            <button className="profile__button" type="button">Редактировать</button>
            <button className="profile__button profile__button_logout" type="button">Выйти из аккаунта</button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default Profile;


