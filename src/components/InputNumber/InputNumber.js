import { memo } from 'react';
import './InputNumber.css';

function InputNumber({
  idLabel = 'number',
  title = 'number',
  formId,
  currentValue,
  onChange
}) {
  return (
    <div className="input-number">
      <label htmlFor={idLabel}>
        {title}
      </label>
      <input
        className="input-number__input"
        name={idLabel}
        form={formId}
        type="number"
        id={idLabel}
        min='1'
        onChange={onChange}
        required
      />
    </div>
  )
}

export default memo(InputNumber);
