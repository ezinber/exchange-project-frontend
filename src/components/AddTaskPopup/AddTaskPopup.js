import React, { memo, useRef } from 'react';
import { useFormWithValidation } from '../../hooks/useForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import Popup from '../Popup/Popup';
import SelectForm from '../SelectForm/SelectForm';

function AddTaskPopup ({
  isOpen,
  onClose,
  onSubmit,
  tickerList,
  stockList = ['MOEX', 'NYSE'],
  currentValue,
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

    const status = checkbox.current.hasAttribute('checked');

    onSubmit({
      ticker: tickerValue,
      stock: stockValue,
      period: numberValue,
      status,
    });

    resetForm();


    console.log('added');
  }

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form
        title="Новая задача"
        buttonName="Добавить"
        isValid={isValid}
        onSubmit={handleSubmit}
      >
        <FormInput
          label="Инструмент"
          name="ticker"
          value={tickerValue}
          onChange={handleChange}
          selectList={tickerList}
          colorMod="inverted"
        />
        <FormInput
          label="Биржа"
          name="stock"
          value={stockValue}
          onChange={handleChange}
          selectList={['MOEX', 'NYSE']}
          colorMod="inverted"
        />
        <FormInput
          label="Итерации"
          type="number"
          name="number"
          value={numberValue}
          onChange={handleChange}
          minLength='1'
          maxLength='30'
          required={false}
          colorMod="inverted"
        />
        <FilterCheckbox
          title="Статус"
          inputRef={checkbox}
          colorMod="inverted"
        />
      </Form>
  </Popup>
  )
}

export default memo(AddTaskPopup);
