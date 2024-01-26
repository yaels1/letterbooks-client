import { NavLink } from "react-router-dom";

import "./Header.scss";
import logo from "../../assets/logo/books-stack-of-three (1).png";

const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="header__title">
          <img src={logo} className="header__logo" />
          <h1>LETTERBOOKS</h1>
        </div>
        <nav className=" nav">
          <NavLink to="/" className="nav__header">
            HOME
          </NavLink>

          <NavLink to="/profile" className="nav__header">
            PROFILE
          </NavLink>

          <NavLink to="/questionnaire" className="nav__header">
            QUESTIONNAIRE
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default Header;
