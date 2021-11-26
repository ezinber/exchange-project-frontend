import { memo } from 'react';
import Button from '../Button/Button';
import Task from '../Task/Task';
import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList';
import './Profile.css';

function Profile({ list, currentValue }) {
  return (
    <>
      <TaskForm
        list={list}
        currentValue={currentValue}
      />
      <TaskList />
    </>
  )
}

export default memo(Profile);