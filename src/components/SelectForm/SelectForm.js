import { memo, useState } from "react";
import "./SelectForm.css";

function SelectForm({ list, selectValue = null, currentValue }) {
  const [value, setValue] = useState(currentValue);

  const handleSetValue = (e) => {
    selectValue && selectValue(e.target.value);
    setValue(e.target.value);
  }

  return (
    <form className="select-form">
      <label htmlFor="cars">Инструмент:</label>
      <select name="cars" id="cars" onChange={handleSetValue} value={value} >
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
