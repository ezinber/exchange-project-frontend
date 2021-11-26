import { memo } from 'react';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import './Header.css';

function Header({ onLogout, onModalOpen }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        alt="Casino&nbsp;Analytics"
      ></img>
      <HeaderMenu
        onLogout={onLogout}
        onModalOpen={onModalOpen}
      />
    </header>
  )
}

export default memo(Header);
