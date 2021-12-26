import React, { useEffect } from 'react';
import Chart from '../Chart/Chart';
import FormInput from '../FormInput/FormInput';
import SelectForm from '../SelectForm/SelectForm';
import './Markets.css';

function Markets({ list, selectValue, currentValue, orderBookData }) {
  useEffect(() => {

  }, [orderBookData])

  return (
    <>
      {/* <SelectForm
        list={list}
        selectValue={selectValue}
        currentValue={currentValue}
      /> */}
      <FormInput
        label="Инструмент"
        name="ticker"
        value={currentValue}
        onChange={selectValue}
        selectList={list}
      />
      <Chart
        orderBookData={orderBookData}
      />
    </>
  )
}

export default Markets;
