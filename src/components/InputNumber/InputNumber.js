import { memo } from 'react';
import './InputNumber.css';

function InputNumber({ idLabel = 'number', title = 'number', formId }) {
  return (
    <div className="input-number">
      <label htmlFor={idLabel}>
        {title}
      </label>
      <input
        className="input-number__input"
        form={formId}
        type="number"
        id={idLabel}
        min='1'
        required
      />
    </div>
  )
}

export default memo(InputNumber);
