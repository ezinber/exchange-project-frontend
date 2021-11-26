import { memo, useDebugValue } from 'react';
import Task from '../Task/Task';
import './TaskList.css';

const mockTasks = [
  {
    ticker: 'USD',
    stock: 'NYEX',
    period: 1,
    status: false,
  },
  {
    ticker: 'GPB',
    stock: 'NYEX',
    period: 6,
    status: true,
  },
  {
    ticker: 'RUB',
    stock: 'NYEX',
    period: 3,
    status: true,
  },
  {
    ticker: 'GLD',
    stock: 'NYEX',
    period: 1,
    status: false,
  },
  {
    ticker: 'USD',
    stock: 'NYEX',
    period: 2,
    status: false,
  },
  {
    ticker: 'EUR',
    stock: 'NYEX',
    period: 1,
    status: true,
  },
]

function TaskList({ tasks = mockTasks }) {
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
        className="task-list__add-task"
        title="Добавить задачу"
      />
    </ul>
  )
}

export default memo(TaskList);
