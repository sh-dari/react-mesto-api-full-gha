import React from 'react';
import Card from './Card';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Profile({ isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, onCardClick, onCardLike, onCardDelete, cards }) {
  const { name, about, avatar } = useContext(CurrentUserContext);

  return(
    <>
      <section className="profile">
        <div className="profile__image" onClick={isEditAvatarPopupOpen}>
          <img className="profile__avatar" alt="Аватар пользователя" src={avatar}/>
        </div>
        <div className="profile__container">
          <div className="profile__info">
            <h1 className="profile__name">{name}</h1>
            <p className="profile__job">{about}</p>
          </div>
          <button type="button" className="profile__edit-button" onClick={isEditProfilePopupOpen}></button>
        </div>
        <button type="button" className="profile__add-button" onClick={isAddPlacePopupOpen}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={card._id} />
          ))}
        </ul>
      </section>
    </>
  );
}

export default Profile;
