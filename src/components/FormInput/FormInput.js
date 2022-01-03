import { memo } from "react";
import { makeClassName } from "../../utils/utils";
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
  colorMod, // 'inverted'
  selectList,
}) {
  const isNumber = type === 'number';

  let pattern = '.+';

  if (type === 'text') {
    pattern = '^[а-яА-Яa-zA-Z\\s\\-]+$';
  };

  if (type === 'email') {
    pattern = '.+@.+\\..+';
  };

  const formInputClassName = makeClassName([
    'form-input',
    [colorMod, `_color_${colorMod}`],
    [error, '_type_error']
  ]);

  const formInputFieldClassName = makeClassName([
    'form-input__field',
    [colorMod, `_color_${colorMod}`],
    [error, '_type_error']
  ])

  const formInputErrorClassName = makeClassName([
    'form-input__error',
    [error, '_visible']
  ])

  return (
      <label className={formInputClassName}>
        {label}

      {!selectList ? (
        <>
          <input
            className={formInputFieldClassName}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            pattern={!isNumber ? pattern : undefined}
            min={isNumber ? minLength : undefined}
            max={isNumber ? maxLength : undefined}
            minLength={!isNumber ? minLength : undefined}
            maxLength={!isNumber ? maxLength : undefined}
            required={required}
          />

          {!isNumber && (
            <span className={formInputErrorClassName}>
              {error}
            </span>
          )}
        </>
      ) : (
        <select
          className={formInputFieldClassName}
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
