import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useForm';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import './Register.css';

function Register({ onRegister }) {
  const {
    values,
    handleChange,
    errors,
    isValid,
  } = useFormWithValidation();

  const {
    name: nameValue = '',
    email: emailValue = '',
    password: passwordValue = '',
  } = values;

  const {
    name: nameError = '',
    email: emailError = '',
    password: passwordError = '',
  } = errors;

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister(nameValue, emailValue, passwordValue);
  }

  return (
    <div className="register">
      {/* TODO: delete
      <div className="register__logo-wrapper">
        <Logo />
      </div>
      */}

      <Form
        title="Добро пожаловать!"
        buttonName="Зарегистрироваться"
        onSubmit={handleSubmit}
        isValid={isValid}
      >
        <FormInput
          label="Имя"
          type="text"
          name="name"
          value={nameValue}
          error={nameError}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required={true}
        />
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

      <p className="register__question">
        <span className="register__question">
          Уже зарегистрированы?&nbsp;
          <NavLink className="register__link button" to="/login">
            Войти
          </NavLink>
        </span>
      </p>
    </div>
  )
}

export default memo(Register);
