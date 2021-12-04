import React, { memo, useRef } from 'react';
import { useFormWithValidation } from '../../hooks/useForm';
import InputNumber from '../InputNumber/InputNumber';
import SelectForm from '../SelectForm/SelectForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './TaskForm.css';
import Button from '../Button/Button';

function TaskForm({
  formId = 'task-form',
  list,
  stockList = ['MOEX', 'NYSE'],
  currentValue,
  addTask
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const checkbox = useRef();

  const {
    ticker: tickerValue = currentValue,
    stock: stockValue = stockList[0],
    number: numberValue = 1,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isChecked = checkbox.current.hasAttribute('checked');
    addTask({ ticker: tickerValue, stock: stockValue, period: numberValue, status: isChecked })
  }

  return (
    <form
      className="task-form"
      id={formId}
      onSubmit={handleSubmit}
    >
      <SelectForm
        title="Инструмент"
        idLabel="ticker"
        formId={formId}
        list={list}
        currentValue={tickerValue}
        onChange={handleChange}
      />
      <SelectForm
        title="Биржа"
        idLabel="stock"
        formId={formId}
        list={stockList}
        currentValue={stockValue}
        onChange={handleChange}
      />
      <InputNumber
        title="Итерации"
        idLabel="number"
        formId={formId}
        currentValue={numberValue}
        onChange={handleChange}
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
