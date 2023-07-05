class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getFetchAnswer(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`);
  }

  _request(endpoint, options) {
    return fetch(`${this.baseUrl + endpoint}`, options).then(res => this.getFetchAnswer(res))
  }

  getInitialCards() {
    return this._request(`/cards`,
    {
      headers: this.headers,
      credentials: 'include'
    })
  }

  getUserInfo() {
    return this._request(`/users/me`,
    {
      headers: this.headers,
      credentials: 'include'
    })
  }

  updateUserInfo(formData) {
    return this._request(`/users/me`,
    {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: formData.name,
        about: formData.about
      }),
      credentials: 'include'
    })
  }

  addNewCard(cardData) {
    return this._request(`/cards`,
    {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      }),
      credentials: 'include'
    })
  }

  deleteCard(id) {
    return this._request(`/cards/${id}`,
    {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include'
    })
  }

  addLike(id) {
    return this._request(`/cards/${id}/likes`,
    {
      method: 'PUT',
      headers: this.headers,
      credentials: 'include'
    })
  }

  deleteLike(id) {
    return this._request(`/cards/${id}/likes`,
    {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include'
    })
  }

  changeLikeCardStatus(id, isLiked) {
    return this._request(`/cards/${id}/likes`,
    {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this.headers,
      credentials: 'include'
    })
  }

  changeAvatar(link) {
    return this._request(`/users/me/avatar`,
    {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      }),
      credentials: 'include'
    })
  }

  getDataToLoadPage() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

}
const api = new Api({
  baseUrl: 'https://api.sh.dari.nomoreparties.sbs',
  headers: {
    authorization: 'a356cdb4-b562-4193-8871-80b2cea38756',
    'Content-Type': 'application/json'
  }
});

export default api;
