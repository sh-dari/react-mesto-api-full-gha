import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

function Register({ handleRegister }) {
  const {values, handleChange} = useForm({
    password: '',
    email: ''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({
      password: values.password,
      email: values.email
    });
  }

  return (
    <div className="login register">
      <h2 className="login__welcome register__welcome">Регистрация</h2>
      <form onSubmit={handleSubmit} className="popup__container login__form">
        <fieldset className="popup__input-container login__input-container">
          <input className="popup__item login__item" type="email" id="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
          <input className="popup__item login__item" type="password" id="password" name="password" placeholder="Пароль" value={values.password} onChange={handleChange} />
        </fieldset>
        <button type="submit" className="popup__button popup__button_for_profile login__button" disabled="">Зарегестрироваться</button>
      </form>
      <div className="register__signin">
        <p className="register__text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;
