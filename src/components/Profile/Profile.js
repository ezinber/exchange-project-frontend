import { memo } from 'react';
import TaskList from '../TaskList/TaskList';
import './Profile.css';

function Profile({ onAddTaskClick, tasksList }) {

  return (
    <>
      <TaskList
        tasks={tasksList}
        onAddTaskClick={onAddTaskClick}
      />
    </>
  )
}

export default memo(Profile);
