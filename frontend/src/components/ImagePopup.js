import React from 'react';
import Popup from "./Popup";

function ImagePopup({ card, onClose }) {
  const isOpen = Object.keys(card).length ? "popup_opened" : "";
  return(
    <Popup isOpen={isOpen} name='image' onClose={onClose}>
      <div className="popup__content popup__content_for_image">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img className="popup__img" src={card.link} alt="Увеличенная карточка"/>
        <p className="popup__text">{card.name}</p>
      </div>
    </Popup>
  );
}

export default ImagePopup;
