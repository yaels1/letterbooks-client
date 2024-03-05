import "./Lists.scss";
import { Link, NavLink } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import SignedOut from "../../components/SignedOut/SignedOut";

const Lists = () => {
  const { user, failedAuth, isAuthLoading } = useAuth();
  if (isAuthLoading) return <h1>Loading...</h1>;

  return (
    <main className="lists">
      <h1 className="lists__header">Lists</h1>
      <div className="list">
        {!user && failedAuth && (
          <div className="list__container">
            <NavLink to="/list/book" className="list__title">
              <p>List of all books</p>
            </NavLink>

            <div className="list__title">
              <p>
                Please{" "}
                <span>
                  {" "}
                  <Link to="/login" className="list__title-login">
                    {" "}
                    login
                  </Link>
                </span>{" "}
                to see more{" "}
              </p>
            </div>
          </div>
        )}

        {user && (
          <>
            <div className="list__container">
              <NavLink to="/list/book" className="list__title">
                <p>List of all books</p>
              </NavLink>
            </div>
            <div className="list__container">
              <NavLink to="/list/read" className="list__title">
                <p>Read Books</p>
              </NavLink>
            </div>
            <div className="list__container">
              <NavLink to="/list/recommendations" className="list__title">
                <p>Book Recommendations</p>
              </NavLink>
            </div>
            <div className="list__container">
              <NavLink to="/list/wishlist" className="list__title">
                <p>Wishlist</p>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </main>
  );
};
export default Lists;
