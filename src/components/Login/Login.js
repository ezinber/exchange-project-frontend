import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useForm';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import './Login.css';

function Login({ onLogin }) {
  const {
    values,
    handleChange,
    errors,
    isValid,
  } = useFormWithValidation();

  const {
    email: emailValue = '',
    password: passwordValue = '',
  } = values;

  const {
    email: emailError = '',
    password: passwordError = '',
  } = errors;

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(emailValue, passwordValue);
  }

  return (
    <div className="login">
      {/* TODO: delete
      <div className="login__logo-wrapper">
        <p>logo</p>
      </div>
      */}
      <Form
        title="Рады видеть!"
        buttonName="Войти"
        onSubmit={handleSubmit}
        isValid={isValid}
      >
        <FormInput
          label="E-mail"
          type="email"
          name="email"
          value={emailValue}
          error={emailError}
          onChange={handleChange}
          required={true}
        />
        <FormInput
          label="Пароль"
          type="password"
          name="password"
          value={passwordValue}
          error={passwordError}
          onChange={handleChange}
          minLength="8"
          required={true}
        />
      </Form>

      <p className="login__question">
        <span className="login__question">
          Ещё не зарегистрированы?&nbsp;
          <NavLink className="login__link button" to="/register">
            Регистрация
          </NavLink>
        </span>
      </p>
    </div>
  )
}

export default memo(Login);
