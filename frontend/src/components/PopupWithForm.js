import React from 'react';
import Popup from "./Popup";

function PopupWithForm({ isOpen, isLoading, name, onClose, onSubmit, button, children, title, isValid }) {
  const isLoaded = isLoading ? "Сохранение..." : (button || 'Сохранить');

  return(
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <div className={`popup__content popup__content_for_${name}`}>
        <form className="popup__container" name={`form_${name}`} onSubmit={onSubmit} noValidate>
          <button type="button" className={`popup__close popup__close_for_${name}`} onClick={onClose}></button>
          <h2 className="popup__heading">{title}</h2>
          {children}
          <button type="submit" className={`popup__button popup__button_for_${name}`} value={button} disabled={!isValid}>{isLoaded}</button>
        </form>
      </div>
    </Popup>
  );
}

export default PopupWithForm;
