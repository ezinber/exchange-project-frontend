import { memo } from 'react';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        alt="Casino&nbsp;Analytics"
      ></img>
      <HeaderMenu />
    </header>
  )
}

export default memo(Header);
