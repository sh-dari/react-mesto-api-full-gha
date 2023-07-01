import React from 'react';
import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormValidation } from '../hooks/useFormValidation';

function EditProfilePopup({ isOpen, isLoading, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, resetForm, setValues} = useFormValidation();

  useEffect(() => {
    resetForm();
    setValues({
      name: currentUser.name,
      about: currentUser.about
    });
  }, [currentUser, isOpen, resetForm, setValues]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about
    });
  }

  return(
    <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} isValid={isValid} >
      <fieldset className="popup__input-container">
        <input className="popup__item popup__item_el_name" value={values.name || ''} onChange={handleChange} type="text" id="name-input" name="name" placeholder="Имя" required minLength="2" maxLength="40"/>
        <span className={`popup__item-error name-input-error ${errors.name ? "popup__item-error_active" : ""}`}>{errors.name}</span>
        <input className="popup__item popup__item_el_about" value={values.about || ''} onChange={handleChange} type="text" id="about-input" name="about" placeholder="О себе" required minLength="2" maxLength="200"/>
        <span className={`popup__item-error about-input-error ${errors.about ? "popup__item-error_active" : ""}`}>{errors.about}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
