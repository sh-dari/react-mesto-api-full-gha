import React from 'react';
import { useForm } from '../hooks/useForm';

function Login({ handleAuthorize }) {
  const {values, handleChange, setValues} = useForm({
    password: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password){
      return;
    }
    handleAuthorize({
      password: values.password,
      email: values.email},
      setValues
    );
  }

  return (
    <div className="login">
      <h2 className="login__welcome">Вход</h2>
      <form onSubmit={handleSubmit} className="popup__container login__form">
        <fieldset className="popup__input-container login__input-container">
          <input className="popup__item login__item" type="email" id="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
          <input className="popup__item login__item" type="password" id="password" name="password" placeholder="Пароль" value={values.password} onChange={handleChange} />
        </fieldset>
        <button type="submit" className="popup__button popup__button_for_profile login__button" disabled="">Войти</button>
      </form>
    </div>
  )
}

export default Login;
