export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;

    this.headers = options.headers;
    this.authorization = options.headers.authorization;
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
  headers: {
    authorization: `${this.authorization}`,
    'Content-Type': 'application/json'
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
  }

  sendUserData(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: {
    authorization: `${this.authorization}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: name,
    about: about
  })
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
  headers: {
    authorization: `${this.authorization}`,
    'Content-Type': 'application/json'
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
  }

  sendNewCard(obj) {
    return fetch(`${this.baseUrl}/cards`, {
  method: 'POST',
  headers: {
    authorization: `${this.authorization}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: obj.name,
    link: obj.link
  })
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
  }
}