import { NavLink } from "react-router-dom";

import "./Header.scss";
import logo from "../../assets/logo/books-stack-of-three (1).png";

const Header = () => {
  return (
    <div className="header">
      <div className="header__title">
        <img src={logo} className="header__logo" alt="book stack logo" />
        <h1 className="header__title-text">LETTERBOOKS</h1>
      </div>
      <nav className=" nav">
        <NavLink to="/" className="nav__header">
          HOME
        </NavLink>

        <NavLink to="/profile" className="nav__header">
          PROFILE
        </NavLink>
        <NavLink to="/list" className="nav__header">
          LISTS
        </NavLink>

        <NavLink to="/questionnaire" className="nav__header">
          QUESTIONNAIRE
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
