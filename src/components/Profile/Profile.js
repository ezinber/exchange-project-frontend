import { memo, useState } from 'react';
import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList';
import './Profile.css';

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

function Profile({ list, currentValue, onAddTask }) {
  const [currentList, setCurrentList] = useState(mockTasks);
  const addTask = (task) => setCurrentList([task, ...currentList]);
  return (
    <>
      <TaskList
        tasks={currentList}
        onAddTask={onAddTask}
      />
    </>
  )
}

export default memo(Profile);
