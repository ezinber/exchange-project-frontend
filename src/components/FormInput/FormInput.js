import { memo } from "react";
import './FormInput.css';

function FormInput({
  label,
  type,
  name,
  value,
  error,
  onChange,
  minLength = '2',
  maxLength = '30',
  required = false,
}) {
  let pattern = '.+';

  if (type === 'text') {
    pattern = '^[а-яА-Яa-zA-Z\\s\\-]+$';
  };

  if (type === 'email') {
    pattern = '.+@.+\\..+';
  };

  return (
    <>
      <span className="form-input__label">
        {label}
      </span>
      <input
        className={`form-input${error ? ' form-input_type_error' : ''}`}
        type={type}
        name={name}
        pattern={pattern}
        value={value}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      />
      <span className={`form-input__error${error ? ' form-input__error_visible' : ''}`}>
        {error}
      </span>
    </>
  )
}

export default memo(FormInput);
