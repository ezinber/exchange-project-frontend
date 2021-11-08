import React, { memo, useRef } from 'react';
import InputNumber from '../InputNumber/InputNumber';
import SelectForm from '../SelectForm/SelectForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './TaskForm.css';
import Button from '../Button/Button';

function TaskForm({ formId = 'task-form', list, currentValue }) {
  const checkbox = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }

  return (
    <form
      className="task-form"
      id={formId}
      onSubmit={handleSubmit}
    >
      <SelectForm
        formId={formId}
        list={list}
        currentValue={currentValue}
      />
      <InputNumber
        title="Итерации"
        formId={formId}
      />
      <SelectForm
        title="Биржа"
        formId={formId}
        list={['MOEX', 'NYSE']}
        idLabel="stock"
      />
      <FilterCheckbox
        title="Статус"
        formId={formId}
        inputRef={checkbox}
      />
      <Button
        title="Создать"
        type="submit"
        formId={formId}
      />
    </form>
  )
}

export default memo(TaskForm);
