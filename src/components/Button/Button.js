import { memo } from 'react';
import './Button.css';

function Button({ title = 'ok', type = 'submit', formId }) {
  return (
    <button
    className="button"
      type={type}
      form={formId}
    >
      {title}
    </button>
  )
}

export default memo(Button);
