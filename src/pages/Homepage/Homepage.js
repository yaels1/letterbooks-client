import "./Homepage.scss";
import { NavLink } from "react-router-dom";
import cosyPhoto from "../../assets/images/cosy-photo.jpg";

import useAuth from "../../hooks/useAuth";

const HomePage = () => {
  const { user, isAuthLoading, handleLogout } = useAuth();

  if (isAuthLoading) return <h1>Loading...</h1>;

  return (
    <main className="homepage__main">
      <div className="homepage">
        <h1 className="homepage__title">Welcome to the homepage!</h1>
        <div className="homepage__intro">
          <div className="homepage__text">
            <div className="homepage__text-container">
              <p>This is a book app</p>
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
          {user && (
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

          {!user && (
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
