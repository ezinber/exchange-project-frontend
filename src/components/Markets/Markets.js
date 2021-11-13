import React, { useEffect } from 'react';
import Chart from '../Chart/Chart';
import SelectForm from '../SelectForm/SelectForm';
import './Markets.css';

function Markets({ list, selectValue, currentValue, orderBookData }) {
  useEffect(() => {

  }, [orderBookData])

  return (
    <>
      <SelectForm
        list={list}
        selectValue={selectValue}
        currentValue={currentValue}
      />
      <Chart
        orderBookData={orderBookData}
      />
    </>
  )
}

export default Markets;
