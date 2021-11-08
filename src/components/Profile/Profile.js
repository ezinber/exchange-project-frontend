import { memo } from 'react';
import TaskForm from '../TaskForm/TaskForm';
import './Profile.css';

function Profile({ list, currentValue }) {
  return (
    <>
      <TaskForm
        list={list}
        currentValue={currentValue}
      />
    </>
  )
}

export default memo(Profile);
