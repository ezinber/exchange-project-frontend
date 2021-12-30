import { memo } from 'react';
import TaskList from '../TaskList/TaskList';
import TickerList from '../TickerList/TickerList';
import './Profile.css';

function Profile({ onAddTaskClick, tasksList }) {

  return (
    <>
      <TaskList
        tasks={tasksList}
        onAddTaskClick={onAddTaskClick}
      />
      <TickerList />
    </>
  )
}

export default memo(Profile);
