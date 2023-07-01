import React from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const currentUserId = currentUser._id;
  const isOwn = card.owner === currentUserId;
  const isLiked = card.likes.some(user => user === currentUserId);
  const cardLikeButtonClassName = (
    `elements__heart ${isLiked && 'elements__heart_active'}`
  );

  const handleClick = () => {
    onCardClick(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  return(
    <li className="elements__item">
      <img className="elements__img" alt={card.name} src={card.link} onClick={handleClick}/>
      <div className="elements__description">
        <h2 className="elements__place">{card.name}</h2>
        <div className="elements__like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
          <p className="elements__like-count">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button type="button" className="elements__trash" onClick={handleDeleteClick}/>}
    </li>
  );
}

export default Card;
