import { memo } from 'react';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import './Header.css';

function Header({ onLogout }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        alt="Casino&nbsp;Analytics"
      ></img>
      <HeaderMenu
        onLogout={onLogout}
      />
    </header>
  )
}

export default memo(Header);
