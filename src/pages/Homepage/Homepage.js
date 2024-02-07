import "./Homepage.scss";
import { NavLink } from "react-router-dom";
import cosyPhoto from "../../assets/images/cosy-photo.jpg";
import { useState } from "react";

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem("tokenlogin");

    return token?.length > 0;
  });

  const handleLogout = () => {
    localStorage.removeItem("tokenlogin");
    setLoggedIn(false);
  };

  return (
    <main className="homepage__main">
      <div className="homepage">
        <h1 className="homepage__title">Welcome to the homepage!</h1>
        <div className="homepage__intro">
          <div className="homepage__text">
            <div className="homepage__text-container">
              <p>This is an book app</p>
              <p>
                There is a quick easy questionnaire to take, to figure out which
                book will be your next adventure.
              </p>
            </div>
            <div className="homepage__text-container">
              <p>
                There are around 50 books in here so far, which you can find in
                the lists section
              </p>
            </div>
          </div>
          <img
            src={cosyPhoto}
            className="homepage__img"
            alt="book stack logo"
          />
        </div>
        <div className="homepage__nav">
          {loggedIn && (
            <>
              <NavLink to="/profile" className="homepage__nav-link">
                <p className="homepage__nav-header">PROFILE</p>
              </NavLink>
              <NavLink to="/questionnaire" className="homepage__nav-link">
                <p className="homepage__nav-header">QUESTIONNAIRE</p>
              </NavLink>

              <button
                className="homepage__nav-link homepage__nav-logout"
                onClick={handleLogout}
              >
                <p className="homepage__nav-header"> LOGOUT</p>
              </button>
            </>
          )}

          {!loggedIn && (
            <NavLink to="/login" className="homepage__nav-link">
              <p className="homepage__nav-header">LOGIN</p>
            </NavLink>
          )}
        </div>
      </div>
    </main>
  );
};
export default HomePage;
