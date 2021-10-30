import { memo } from "react";
import "./SelectForm.css";

function SelectForm({ list, setValue, currentItem }) {
  const handleSetValue = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  }

  return (
    <form className="select-form">
      <label htmlFor="cars">Инструмент:</label>
      <select name="cars" id="cars" onChange={handleSetValue} value={currentItem} >
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
