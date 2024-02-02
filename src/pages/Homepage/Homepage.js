import "./Homepage.scss";
import { NavLink } from "react-router-dom";
import cosyPhoto from "../../assets/images/cosy-photo.jpg";

const HomePage = () => {
  return (
    <main>
      <div className="homepage">
        <h1 className="homepage__title">Welcome to the homepage!</h1>
        <div className="homepage__intro">
          <div className="homepage__text">
            <p>This is an book app</p>
            <p>
              There is a quick easy questionnaire to take, to figure out which
              book will be your next adventure.
            </p>
            <p>
              There are around 50 books in here so far, which you can find in
              the lists section
            </p>

            <p>WISHLIST TO COME</p>
          </div>
          <img
            src={cosyPhoto}
            className="homepage__img"
            alt="book stack logo"
          />
        </div>
        <div className="homepage__nav">
          <NavLink to="/profile" className="homepage__nav-link">
            <p className="homepage__nav-header">PROFILE</p>
          </NavLink>
          <NavLink to="/questionnaire" className="homepage__nav-link">
            <p className="homepage__nav-header">QUESTIONNAIRE</p>
          </NavLink>

          <NavLink to="/login" className="homepage__nav-link">
            <p className="homepage__nav-header">LOGIN</p>
          </NavLink>
        </div>
      </div>
    </main>
  );
};
export default HomePage;
