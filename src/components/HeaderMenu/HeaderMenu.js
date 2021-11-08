import { memo, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import DropMenu from "../DropMenu/DropMenu";
import "./HeaderMenu.css";

function HeaderMenu({ onLogout }) {
  const isLoggedIn = useContext(CurrentUserContext);

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handleMenuButtonClick = () => setIsMenuOpened(!isMenuOpened);
  // TODO: предотвратить закрытие меню при клике мимо ссылки
  const handleMenuClose = (e) =>
    e.target.closest(".header-menu_visible") && setIsMenuOpened(false);

  return (
    <>
      <nav
        className={`header-menu${isMenuOpened ? " header-menu_visible" : ""}`}
        onClick={handleMenuClose}
      >
        <ul className="header-menu__list">
          <li className="header-menu__item">
            <NavLink
              exact
              className="header-menu__link"
              activeClassName="header-menu__link_active"
              to="/"
            >
              Главная
            </NavLink>
          </li>

          {isLoggedIn && (
            <DropMenu linkClass={"header-menu__link"}>
              <NavLink
                exact
                className="header-menu__link"
                activeClassName="header-menu__link_active"
                to="/markets"
              >
                Рынки
              </NavLink>
            </DropMenu>
            /*
            <li className="header-menu__item">
              <DropMenu linkClass={"header-menu__link"} />
            </li>
            */
          )}

          <li className="header-menu__item">
            <NavLink
              className="header-menu__link"
              activeClassName="header-menu__link_active"
              to="/about"
            >
              О&nbsp;компании
            </NavLink>
          </li>
        </ul>

        <ul className="header-menu__list">
          {isLoggedIn ? (
            <>
              <li className="header-menu__item">
                <NavLink
                  className="header-menu__link"
                  activeClassName="header-menu__link_active"
                  to="/profile"
                >
                  {isLoggedIn.username}
                </NavLink>
              </li>

              <li className="header-menu__item">
                <button
                  onClick={onLogout}
                  className="header-menu__link header-menu__link_type_auth"
                  to="/"
                >
                  Выйти
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="header-menu__item">
                <NavLink
                  className="header-menu__link header-menu__link_type_auth"
                  activeClassName="header-menu__link_hidden"
                  to="/register"
                >
                  Регистрация
                </NavLink>
              </li>

              <li className="header-menu__item">
                <NavLink
                  className="header-menu__link header-menu__link_type_auth"
                  activeClassName="header-menu__link_hidden"
                  to="/login"
                >
                  Войти
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
      <button
        className={`header-menu__button${
          isMenuOpened ? " header-menu__button_type_close" : ""
        }`}
        type="button"
        onClick={handleMenuButtonClick}
      />
    </>
  );
}

export default memo(HeaderMenu);
