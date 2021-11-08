import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import './DropMenu.css';

const headerLinks = [
  { name: 'Фондовый', path: '/markets/stock' },
  { name: 'Долговой', path: '/markets/debt' },
  { name: 'Валютный', path: '/markets/forex' },
];

function DropMenu({
  linkClass = "drop-menu__link", // класс ссылки от родительского компонента
  position, // 'left' или 'right'. По умолчанию внизу
  links = headerLinks, // массив объектов с ссылками типа: { name, path }
  children // элемент, активирующий список
}) {
  const listClassMod = position ? ` drop-menu__list_pos_${position}` : '';

  return (
    <div className="drop-menu">
      {children}

      <ul className={`drop-menu__list${listClassMod}`}>
        {links.map((link, index) => (
          <li className="drop-menu__item" key={index}>
            <NavLink
              className={linkClass}
              activeClassName={`${linkClass} ${linkClass}_active`}
              to={link.path}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(DropMenu);
