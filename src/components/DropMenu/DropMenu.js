import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import './DropMenu.css';

function DropMenu({
  linkClass = "drop-menu__link", // класс ссылки от родительского компонента
}) {
  return (
    <div className="drop-menu">
      <NavLink
        className={linkClass}
        activeClassName={`${linkClass} ${linkClass}_active`}
        to="/markets"
      >
        Рынки
      </NavLink>
      <ul className="drop-menu__list">
        <li className="drop-menu__item">
          <NavLink
            exact
            className={linkClass}
            activeClassName={`${linkClass} ${linkClass}_active`}
            to="/markets/stock"
          >
            Фондовый
          </NavLink>
        </li>
        <li className="drop-menu__item">
          <NavLink
            exact
            className={linkClass}
            activeClassName={`${linkClass} ${linkClass}_active`}
            to="/markets/debt"
          >
            Долговой
          </NavLink>
        </li>
        <li className="drop-menu__item">
          <NavLink
            exact
            className={linkClass}
            activeClassName={`${linkClass} ${linkClass}_active`}
            to="/markets/forex"
          >
            Валютный
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default memo(DropMenu);
