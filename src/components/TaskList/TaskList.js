import { memo } from 'react';
import Task from '../Task/Task';
import './TaskList.css';

function TaskList({ tasks, onAddTaskClick }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <Task
          ticker={task.ticker}
          stock={task.exchange}
          period={task.record_period}
          status={task.status}
          key={task.id}
        />
      ))}
      <button
        className="task-list__add-button"
        type="button"
        title="Добавить задачу"
        onClick={onAddTaskClick}
      />
    </ul>
  )
}

export default memo(TaskList);
