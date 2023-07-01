import React from 'react';
import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormValidation } from '../hooks/useFormValidation';

function AddPlacePopup({ isOpen, onClose, onCreateCard, isLoading }) {
  const {values, handleChange, errors, isValid, resetForm} = useFormValidation();

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onCreateCard({
      name: values.name,
      link: values.link
    });
  }

  return(
    <PopupWithForm name="card" title="Новое место" button="Создать" isOpen={isOpen} isLoading={isLoading} onClose={onClose} onSubmit={handleSubmit} isValid={isValid} >
      <fieldset className="popup__input-container">
        <input className="popup__item popup__item_el_place" value={values.name || ''} onChange={handleChange} type="text" id="place-input" name="name" placeholder="Название" required minLength="2" maxLength="30"/>
        <span className={`popup__item-error place-input-error ${errors.name ? "popup__item-error_active" : ""}`}>{errors.name}</span>
        <input className="popup__item popup__item_el_link" value={values.link || ''} onChange={handleChange} type="url" id="link-input" name="link" placeholder="Ссылка на картинку" required/>
        <span className={`popup__item-error link-input-error ${errors.link ? "popup__item-error_active" : ""}`}>{errors.link}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
