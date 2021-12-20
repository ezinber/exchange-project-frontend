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
  colorMod = '', // 'inverted'
  selectList,
}) {
  const inputColorMod = error ? 'error' : colorMod;
  const isNumber = type === 'number';

  let pattern = '.+';

  if (type === 'text') {
    pattern = '^[а-яА-Яa-zA-Z\\s\\-]+$';
  };

  if (type === 'email') {
    pattern = '.+@.+\\..+';
  };

  return (
      <label className={`form-input${colorMod ? ' form-input_color_' + colorMod : ''}`}>
        {label}

      {!selectList ? (
        <>
          <input
            className={`form-input__field${inputColorMod ? ' form-input__field_color_' + inputColorMod : ''}`}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            pattern={!isNumber && pattern}
            min={isNumber && minLength}
            max={isNumber && maxLength}
            minLength={!isNumber && minLength}
            maxLength={!isNumber && maxLength}
            required={required}
          />

          {!isNumber && (
            <span className={`form-input__error${error ? ' form-input__error_visible' : ''}`}>
              {error}
            </span>
          )}
        </>
      ) : (
        <select
          className={`form-input__field${inputColorMod ? ' form-input__field_color_' + inputColorMod : ''}`}
          name={name}
          onChange={onChange}
          value={value}
        >
          {selectList.map((item, index) => (
            <option
              className="select-form__option"
              value={item}
              key={index}
            >
              {item}
            </option>
          ))}
        </select>
      )}
      </label>
  )
}

export default memo(FormInput);
