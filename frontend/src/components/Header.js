import React from 'react';
import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

function Header({ userEmail, handleEmailClean }) {
  const { loggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToRegistration = () => {
    navigate('/sign-up');
  }
  const navigateToLogin = () => {
    navigate('/sign-in');
  }
  const signOut = () => {
    localStorage.removeItem('jwt');
    navigateToLogin();
    handleEmailClean();
  }

  return(
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo"></div>
        <div className="header__info">
          <p className="header__email">{userEmail}</p>
          {loggedIn ?
            <button onClick={signOut} className="header__text header__text_type_exit">Выйти</button>
            :
            location.pathname==="/sign-up" ?
              <button onClick={navigateToLogin} className="header__text header__text_type_exit">Войти</button>
              : <button onClick={navigateToRegistration} className="header__text header__text_type_exit">Регистрация</button>
          }
        </div>
      </div>
      <div className="header__line"></div>
    </header>
    );
}

export default Header;
