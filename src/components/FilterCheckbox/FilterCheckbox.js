import { memo } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({
  title = 'Check',
  formId,
  idLabel = 'checkbox',
  inputRef,
  onCheck = null
}) {
  const handleChange = () => {
    const isChecked = inputRef.current.hasAttribute('checked');

    isChecked
      ? inputRef.current.removeAttribute('checked')
      : inputRef.current.setAttribute('checked', true);

    onCheck && onCheck(!isChecked);
  }

  return (
    <label htmlFor={idLabel} className="filter-checkbox">
      <input
        className="filter-checkbox__invisible-checkbox"
        form={formId}
        type="checkbox"
        id={idLabel}
        onChange={handleChange}
        ref={inputRef}
      />
      <span className="filter-checkbox__visible-checkbox" />
      {title}
    </label>
  )
}

export default memo(FilterCheckbox);
