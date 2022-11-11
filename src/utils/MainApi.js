class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  ///Получить информацию о пользователе
  getUserInformation() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }

  // Получить сохраненные фильмы
  getMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }


  //Изменение данных профиля
  editProfile({name, email}) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    }).then((res) => this._checkResponse(res));
  }

//Удалить сохраненный фильм
  deleteCard(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }

}

const api = new Api({
  url: 'https://api.moviesexplorer.dipl.nomoredomains.sbs',
  headers: {
    "content-type": "application/json"
  }
});

export default api;
