import { memo } from 'react';
import SelectForm from '../SelectForm/SelectForm';
import './Profile.css';

function Profile({ list, currentValue }) {
  return (
    <SelectForm
      list={list}
      currentValue={currentValue}
    />
  )
}

export default memo(Profile);
