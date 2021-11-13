import { memo } from 'react';
import './Task.css';

function Task({ ticker = 'AAL', period = '2', status = true }) {
  return (
    <li className="task">
      <dl>
        <dt>
          Тикер
        </dt>
        <dd>
          {ticker}
        </dd>
        <dt>
          Период записи
        </dt>
        <dd>
          {period}
        </dd>
        <dt>
          Статус
        </dt>
        <dd>
          {status ? 'Активно' : 'Неактивно'}
        </dd>
      </dl>
      <button className="task__button task__button_type_edit" />
      <button className="task__button task__button_type_delete" />
    </li>
  )
}

export default memo(Task);
