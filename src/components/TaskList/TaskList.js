import { memo } from 'react';
import Task from '../Task/Task';
import './TaskList.css';

function TaskList({ tasks }) {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <Task
          ticker={task.ticker}
          stock={task.stock}
          period={task.period}
          status={task.status}
          key={index}
        />
      ))}
      <button
        className="task-list__add-button"
        type="button"
        title="Добавить задачу"
      />
    </ul>
  )
}

export default memo(TaskList);
