import React from 'react';
import Profile from './Profile';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';

function Main({
  isEditAvatarPopupOpen,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
  handleAuthorize,
  handleRegister
}) {

  return(
    <main className="content">
      <Routes>
        <Route path="/react-mesto-auth" element={<Navigate to="/" replace />}/>
        <Route path="/" element={
          <ProtectedRouteElement
            element={Profile}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            isEditProfilePopupOpen={isEditProfilePopupOpen}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            cards={cards}
          />
        }/>
        <Route path="/sign-up" element={<Register handleRegister={handleRegister}/>} />
        <Route path="/sign-in" element={<Login handleAuthorize={handleAuthorize} />} />
      </Routes>
    </main>
  );
}

export default Main;
