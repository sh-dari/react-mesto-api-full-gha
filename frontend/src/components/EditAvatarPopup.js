import React from 'react';
import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, isLoading, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return(
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} isValid={true} >
      <fieldset className="popup__input-container popup__input-container_for_avatar">
        <input className="popup__item popup__item_el_link" ref={avatarRef} type="url" id="avatar-input" name="link" placeholder="Ссылка на картинку" required/>
        <span className="popup__item-error avatar-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
