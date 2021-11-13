import { memo, useState } from "react";
import "./SelectForm.css";

function SelectForm({ 
  list,
  title = 'Инструмент',
  idLabel = 'select',
  formId,
  selectValue = null,
  currentValue,
  onChange,
}) {
  const [value, setValue] = useState(currentValue);

  const handleSetValue = (e) => {
    selectValue && selectValue(e.target.value);
    onChange && onChange(e);
    setValue(e.target.value);
  }

  return (
    <form className="select-form">
      <label htmlFor={idLabel}>{title}</label>
      <select
        name={idLabel}
        form={formId}
        id={idLabel}
        onChange={handleSetValue}
        value={value}
      >
        {list.map((item, index) => (
          <option
            className="select-form__option" 
            value={item}
            key={index}
          >
            {item}
          </option>
        ))}
      </select>
    </form>
  );
}

export default memo(SelectForm);
