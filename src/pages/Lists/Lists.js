import "./Lists.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Lists = () => {
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return token?.length > 0;
  });

  return (
    <main className="lists">
      <h1 className="lists__header">Lists</h1>
      <div className="list">
        {!loggedIn && (
          <div className="list__container">
            <NavLink to="/list/book" className="list__title">
              <p>List of all books</p>
            </NavLink>
          </div>
        )}

        {loggedIn && (
          <>
            <div className="list__container">
              <NavLink to="/list/book" className="list__title">
                <p>List of all books</p>
              </NavLink>
            </div>
            <div className="list__container">
              <NavLink to="/list/read" className="list__title">
                <p>List of books you've read</p>
              </NavLink>
            </div>
            <div className="list__container">
              <NavLink to="/list/recommendations" className="list__title">
                <p c>List of book recommendations</p>
              </NavLink>
            </div>
            <div className="list__container">
              <NavLink to="/list/wishlist" className="list__title">
                <p>List of books you want to read</p>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </main>
  );
};
export default Lists;
