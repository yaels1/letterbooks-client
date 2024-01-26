import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header>
        <div>
          {/* <img to logo/> */}
          <h1>Letterbooks</h1>
        </div>
        <nav>
          {/* link to home */}
          <NavLink to="/">Home</NavLink>
          {/* link to profile */}
          <NavLink to="/profile">Profile</NavLink>
          {/* link to questionnaire */}
          <NavLink to="/questionnaire">Questionnaire</NavLink>
        </nav>
      </header>
    </div>
  );
};

export default Header;
