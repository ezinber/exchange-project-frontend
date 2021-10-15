import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import DropMenu from '../DropMenu/DropMenu';
import './HeaderMenu.css';

function HeaderMenu({  }) {
  return (
  <nav className="header-menu">
    <ul className="header-menu__list">
      <li className="header-menu__item">
        <NavLink
          exact
          className="header-menu__link"
          activeClassName="header-menu__link header-menu__link_active"
          to="/"
        >
          Главная
        </NavLink>
      </li>

      <li className="header-menu__item">
        <DropMenu linkClass={"header-menu__link"} />
        {/*<div className="header-menu__drop-list-wrapper">
          <NavLink
            className="header-menu__link"
            activeClassName="header-menu__link header-menu__link_active"
            to="/markets"
          >
            Рынки
          </NavLink>
          <ul className="header-menu__list header-menu__list_type_drop">
            <li className="header-menu__item">
              <NavLink
                exact
                className="header-menu__link"
                activeClassName="header-menu__link header-menu__link_active"
                to="/markets/stock"
              >
                Фондовый
              </NavLink>
            </li>
            <li className="header-menu__item">
              <NavLink
                exact
                className="header-menu__link"
                activeClassName="header-menu__link header-menu__link_active"
                to="/markets/debt"
              >
                Долговой
              </NavLink>
            </li>
            <li className="header-menu__item">
              <NavLink
                exact
                className="drop-menu__link"
                activeClassName="drop-menu__link drop-menu__link_active"
                to="/markets/forex"
              >
                Валютный
              </NavLink>
            </li>
          </ul>
        </div>*/}
      </li>

      <li className="header-menu__item">
        <NavLink
          className="header-menu__link"
          activeClassName="header-menu__link header-menu__link_active"
          to="/about"
        >
          О&nbsp;компании
        </NavLink>
      </li>
    </ul>
  </nav>
  )
}

export default memo(HeaderMenu);
