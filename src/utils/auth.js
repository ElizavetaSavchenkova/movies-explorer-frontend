export const url = 'https://api.moviesexplorer.dipl.nomoredomains.sbs';

function checkResponse(res) {
  if (res.ok) {
    console.log(res.json)
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const registerUser = ({ name, email, password }) => {
  return fetch(`${url}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  }).then(checkResponse)
};

export const authorizeUser = ({ email, password }) => {
  return fetch(`${url}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(checkResponse);
}

export const getInfoToken = (token) => {
  return fetch(`${url}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
