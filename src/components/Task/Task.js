import { memo } from 'react';
import './Task.css';

function Task({ ticker = 'AAL', stock = 'MOEX', period = '2', status = true }) {
  return (
    <li className="task">
      <h2
        className="task__title"
        title={`Тикер: ${ticker}, биржа: ${stock}`}
      >
        {`${ticker} ${stock}`}
      </h2>
      <p
        className="task__count"
        title={`Количество итераций: ${period}`}
      >
        {period}
      </p>
      <button
        className="task__button task__button_type_edit"
        title={status ? 'Приостановить задачу' : 'Возобновить задачу'}
      />
      <button
        className="task__button task__button_type_delete"
        title="Удалить задачу"
      />
    </li>
  )
}

export default memo(Task);
