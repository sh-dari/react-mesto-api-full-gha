import React from 'react';
import Popup from './Popup';
import okIcon from '../images/ok.svg';
import errorIcon from '../images/error.svg';

function InfoTooltip({ onClose, isOpen, successRegistration }) {
  const success = successRegistration;
  return(
    <Popup isOpen={isOpen} name='registration' onClose={onClose}>
      <div className="popup__content popup__content_for_registration">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img src={success ? okIcon : errorIcon} alt='Статус регистрации' className="popup__icon"/>
        <p className="popup__status">{success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!Попробуйте ещё раз."}</p>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
